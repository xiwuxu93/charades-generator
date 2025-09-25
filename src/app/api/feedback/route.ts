import { NextRequest, NextResponse } from 'next/server';
import kv from '@/lib/cloudflare-kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.usage_purpose || !body.primary_scenario) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a unique key for the feedback
    const timestamp = new Date().toISOString();
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare feedback data
    const feedbackData = {
      ...body,
      submitted_at: timestamp,
      ip_address: request.ip || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    };

    // Store in Cloudflare KV
    await kv.put(feedbackId, JSON.stringify(feedbackData), {
      type: 'feedback',
      submitted_at: timestamp
    });

    console.log('Feedback stored successfully:', feedbackId);

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedbackId
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit feedback',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Optional: API to list feedback (for admin purposes)
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await kv.list('feedback_', limit);

    return NextResponse.json({
      success: true,
      count: result.keys.length,
      feedbacks: result.keys.map(key => ({
        id: key.name,
        metadata: key.metadata
      }))
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}