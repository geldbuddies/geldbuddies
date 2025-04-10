import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { classroomSessions, classroomParticipants } from '@/db/schemas/classroom-schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * GET /api/classroom/[id]/participants
 * Get all participants in a classroom session
 */
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Properly await the params object
    const params = await Promise.resolve(context.params);
    const { id } = params;
    const classroomId = parseInt(id);
    
    // Skip authentication check in development
    if (process.env.NODE_ENV !== 'development') {
      // Authentication check in production
      const session = await getServerSession(authOptions);
      
      if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    
    if (isNaN(classroomId)) {
      return NextResponse.json({ error: 'Invalid classroom ID' }, { status: 400 });
    }

    // Check if classroom exists
    const classroom = await db.query.classroomSessions.findFirst({
      where: eq(classroomSessions.id, classroomId),
    });

    if (!classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
    }

    // Get all active participants
    const participants = await db.query.classroomParticipants.findMany({
      where: and(
        eq(classroomParticipants.sessionId, classroomId),
        eq(classroomParticipants.isActive, true)
      ),
      orderBy: (participants) => [participants.joinedAt],
    });

    return NextResponse.json({
      classroom,
      participants,
      count: participants.length
    });
  } catch (error) {
    console.error('Error fetching classroom participants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classroom participants',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 