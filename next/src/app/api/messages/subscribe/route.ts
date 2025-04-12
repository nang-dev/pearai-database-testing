import { stackServerApp } from '@/stack';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET(request: Request) {
  try {
    const user = await stackServerApp.getUser({ or: 'throw' });
    const { searchParams } = new URL(request.url);
    const friendId = searchParams.get('friendId');

    if (!friendId) {
      return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    console.log('Setting up SSE connection for user:', user.id, 'friend:', friendId);

    // Create a WebSocket connection to Neon's realtime feature
    const client = await pool.connect();
    console.log('Database connection established');

    // Listen for new messages
    await client.query('LISTEN new_messages');
    console.log('Listening for new messages');

    // Set up Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        client.on('notification', async (msg) => {
          console.log('Received notification:', msg.payload);
          const payload = JSON.parse(msg.payload || '{}');

          // Only send messages that involve the current user and friend
          if ((payload.sender_id === user.id && payload.receiver_id === friendId) ||
              (payload.sender_id === friendId && payload.receiver_id === user.id)) {
            console.log('Sending message to client');
            controller.enqueue(`data: ${JSON.stringify(payload)}\n\n`);
          } else {
            console.log('Message not relevant to this connection');
          }
        });

        // Send a test message to confirm connection
        controller.enqueue(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
      },
      cancel() {
        console.log('SSE connection cancelled');
        client.query('UNLISTEN new_messages');
        client.release();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('Failed to set up message subscription:', error);
    return NextResponse.json({ error: 'Failed to subscribe to messages' }, { status: 500 });
  }
}