import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { classroomParticipants } from '@/server/db/schemas/classroom-schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Skip authentication check in development
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });

      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { participantId, redirectToHome = false } = await req.json();

    // Validate input
    if (!participantId || typeof participantId !== 'number') {
      return NextResponse.json({ error: 'Invalid participant ID' }, { status: 400 });
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
        isActive: true,
      },
    });

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // Update the participant status
    await db
      .update(classroomParticipants)
      .set({
        status: 'removed',
        isActive: false,
        metadata: JSON.stringify({ redirectToHome, removedAt: new Date().toISOString() }),
      })
      .where(eq(classroomParticipants.id, participant.id));

    return NextResponse.json({
      success: true,
      participant: {
        id: participant.id,
        playerId: participant.playerId,
        status: 'removed',
        shouldRedirect: redirectToHome,
      },
    });
  } catch (error) {
    console.error('Error removing participant:', error);
    return NextResponse.json({ error: 'Failed to remove participant' }, { status: 500 });
  }
}
