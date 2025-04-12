import { stackServerApp } from '@/stack';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });

    // Get user info from users_sync table
    const result = await pool.query(
      'SELECT email, name FROM neon_auth.users_sync WHERE id = $1',
      [user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}