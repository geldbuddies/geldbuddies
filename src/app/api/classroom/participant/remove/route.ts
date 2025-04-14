import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { classroomParticipants } from '@/db/schemas/classroom-schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Skip authentication check in development
    const isDev = process.env.NODE_ENV === 'development';
    
    if (!isDev) {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
    
    const { participantId, redirectToHome = false } = await req.json();

    // Validate input
    if (!participantId || typeof participantId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid participant ID' },
        { status: 400 }
      );
    }

    // Find the participant
    const participant = await db.query.classroomParticipants.findFirst({
      where: eq(classroomParticipants.id, participantId),
      columns: {
        id: true,
        playerId: true,
        sessionId: true,
        displayName: true,
        status: true,
        isActive: true
      }
    });

    if (!participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      );
    }

    // Update the participant status
    await db.update(classroomParticipants)
      .set({
        status: 'removed',
        isActive: false,
        metadata: JSON.stringify({ redirectToHome, removedAt: new Date().toISOString() })
      })
      .where(eq(classroomParticipants.id, participant.id));

    return NextResponse.json({
      success: true,
      participant: {
        id: participant.id,
        playerId: participant.playerId,
        status: 'removed',
        shouldRedirect: redirectToHome
      }
    });
  } catch (error) {
    console.error('Error removing participant:', error);
    return NextResponse.json(
      { error: 'Failed to remove participant' },
      { status: 500 }
    );
  }
} 