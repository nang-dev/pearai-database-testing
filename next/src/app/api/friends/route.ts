import { stackServerApp } from '@/stack';
import { NextResponse } from 'next/server';
import { Pool, DatabaseError } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Get friends list
export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const result = await pool.query(
      `SELECT
        u.id,
        u.email,
        f.status,
        f.created_at,
        f.user_id
       FROM friendships f
       JOIN neon_auth.users_sync u ON (
         CASE
           WHEN f.friend_id = $1 THEN f.user_id = u.id
           ELSE f.friend_id = u.id
         END
       )
       WHERE f.user_id = $1 OR f.friend_id = $1`,
      [user.id]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('Database error:', error.message);
    } else {
      console.error('Failed to fetch friends:', error);
    }
    return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
  }
}

// Send friend request
export async function POST(request: Request) {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const { friendEmail } = await request.json();

    // Get current user's email
    const currentUserResult = await pool.query(
      'SELECT email FROM neon_auth.users_sync WHERE id = $1',
      [user.id]
    );

    // Prevent adding yourself as a friend
    if (friendEmail === currentUserResult.rows[0]?.email) {
      return NextResponse.json({ error: 'Cannot add yourself as a friend' }, { status: 400 });
    }

    console.log('Current user:', user);
    console.log('Friend email:', friendEmail);

    // Get friend's user ID from users_sync table
    const friendResult = await pool.query(
      'SELECT id FROM neon_auth.users_sync WHERE email = $1',
      [friendEmail]
    );

    console.log('Friend query result:', friendResult.rows);

    if (friendResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const friendId = friendResult.rows[0].id;

    // Check if friendship already exists
    const existingFriendship = await pool.query(
      'SELECT * FROM friendships WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)',
      [user.id, friendId]
    );

    console.log('Existing friendship check:', existingFriendship.rows);

    if (existingFriendship.rows.length > 0) {
      return NextResponse.json({ error: 'Friendship already exists' }, { status: 400 });
    }

    console.log('Attempting to create friendship with user_id:', user.id, 'friend_id:', friendId);

    // Create friendship
    const insertResult = await pool.query(
      'INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2) RETURNING *',
      [user.id, friendId]
    );

    console.log('Insert result:', insertResult.rows[0]);

    return NextResponse.json({ message: 'Friend request sent' });
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('Database error:', error.message);
    } else {
      console.error('Failed to send friend request:', error);
    }
    return NextResponse.json({ error: 'Failed to send friend request' }, { status: 500 });
  }
}