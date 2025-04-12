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

    // Update friendship status to rejected
    const result = await pool.query(
      `UPDATE friendships
       SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
       WHERE friend_id = $2 AND user_id = $1 AND status = 'pending'
       RETURNING *`,
      [friendId, user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error('Failed to reject friend request:', error);
    return NextResponse.json({ error: 'Failed to reject friend request' }, { status: 500 });
  }
}