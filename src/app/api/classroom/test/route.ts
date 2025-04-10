import { NextResponse } from 'next/server';
import { db } from '@/db';
import { classroomSessions } from '@/db/schemas/classroom-schema';

/**
 * GET /api/classroom/test
 * Test endpoint to verify DB connection and queries
 */
export async function GET() {
  try {
    // Try to get all classroom sessions without any filters
    // This is just to test the database connection and query capability
    const result = await db.query.classroomSessions.findMany({
      limit: 5,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful', 
      count: result.length,
      firstFew: result
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 