import { stackServerApp } from '@/stack';
import { NextResponse } from 'next/server';
import { Pool, DatabaseError } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Get messages with a specific user
export async function GET(request: Request) {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const { searchParams } = new URL(request.url);
    const friendId = searchParams.get('friendId');

    if (!friendId) {
      return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    // Verify friendship exists and is accepted
    const friendshipResult = await pool.query(
      `SELECT * FROM friendships
       WHERE ((user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1))
       AND status = 'accepted'`,
      [user.id, friendId]
    );

    if (friendshipResult.rows.length === 0) {
      return NextResponse.json({ error: 'Not friends with this user' }, { status: 403 });
    }

    // Get messages between users
    const result = await pool.query(
      `SELECT m.*, u.email as sender_email
       FROM messages m
       JOIN neon_auth.users_sync u ON m.sender_id = u.id
       WHERE (sender_id = $1 AND receiver_id = $2)
       OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at DESC
       LIMIT 50`,
      [user.id, friendId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('Database error:', error.message);
    } else {
      console.error('Failed to fetch messages:', error);
    }
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// Send a message
export async function POST(request: Request) {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const { receiverId, content } = await request.json();

    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Receiver ID and content are required' }, { status: 400 });
    }

    // Verify friendship exists and is accepted
    const friendshipResult = await pool.query(
      `SELECT * FROM friendships
       WHERE ((user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1))
       AND status = 'accepted'`,
      [user.id, receiverId]
    );

    if (friendshipResult.rows.length === 0) {
      return NextResponse.json({ error: 'Not friends with this user' }, { status: 403 });
    }

    // Use a transaction to ensure notification is sent after insert
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Send message
      const result = await client.query(
        'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
        [user.id, receiverId, content]
      );

      // Get the complete message with sender email
      const message = result.rows[0];
      const senderEmail = (await client.query(
        'SELECT email FROM neon_auth.users_sync WHERE id = $1',
        [user.id]
      )).rows[0].email;

      const completeMessage = {
        id: message.id,
        content: message.content,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        created_at: message.created_at,
        sender_email: senderEmail
      };

      // Notify about new message
      await client.query(
        `SELECT pg_notify(
          'new_messages',
          $1::text
        )`,
        [JSON.stringify(completeMessage)]
      );

      await client.query('COMMIT');
      return NextResponse.json(message);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('Database error:', error.message);
    } else {
      console.error('Failed to send message:', error);
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}