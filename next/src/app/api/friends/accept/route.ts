import { stackServerApp } from '@/stack';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const { friendId } = await request.json();

    // Update friendship status to accepted
    const result = await pool.query(
      `UPDATE friendships
       SET status = 'accepted', updated_at = CURRENT_TIMESTAMP
       WHERE friend_id = $2 AND user_id = $1 AND status = 'pending'
       RETURNING *`,
      [friendId, user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Failed to accept friend request:', error);
    return NextResponse.json({ error: 'Failed to accept friend request' }, { status: 500 });
  }
}