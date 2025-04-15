import { authOptions } from '@/lib/auth';
import { db } from '@/server/db';
import { classroomParticipants, classroomSessions } from '@/server/db/schemas/classroom-schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/classroom/[id]/participants
 * Get all participants in a classroom session
 */
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    // Properly await the params object
    const params = await Promise.resolve(context.params);
    const { id } = params;

    // Skip authentication check in development
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const classroomId = parseInt(id, 10);

    // Validate input
    if (isNaN(classroomId)) {
      return NextResponse.json({ error: 'Invalid classroom ID' }, { status: 400 });
    }

    console.log('Fetching classroom with ID:', classroomId);

    // Find the classroom
    const classroom = await db.query.classroomSessions.findFirst({
      where: eq(classroomSessions.id, classroomId),
      columns: {
        id: true,
        name: true,
        code: true,
        description: true,
        isActive: true,
        maxPlayers: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    if (!classroom) {
      return NextResponse.json(
        { error: 'Classroom not found or you do not have permission to view it' },
        { status: 404 }
      );
    }

    console.log('Found classroom:', classroom.name);

    // Check if current user has been removed
    let shouldRedirect = false;

    // Use request cookies instead of server cookies
    const participantIdCookie = req.cookies.get('participantId');

    if (participantIdCookie) {
      const participantId = parseInt(participantIdCookie.value, 10);

      if (!isNaN(participantId)) {
        // Check if this participant exists but has been marked as removed
        const removedParticipant = await db.query.classroomParticipants.findFirst({
          where: and(
            eq(classroomParticipants.id, participantId),
            eq(classroomParticipants.sessionId, classroomId),
            eq(classroomParticipants.status, 'removed')
          ),
        });

        if (removedParticipant) {
          console.log('Participant has been removed, should redirect to home');
          shouldRedirect = true;
        }
      }
    }

    // Get participants
    const participantsData = await db.query.classroomParticipants.findMany({
      where: and(
        eq(classroomParticipants.sessionId, classroomId),
        eq(classroomParticipants.isActive, true)
      ),
      columns: {
        id: true,
        playerId: true,
        displayName: true,
        status: true,
        joinedAt: true,
        lastActiveAt: true,
        isActive: true,
      },
      orderBy: (participants) => [participants.joinedAt],
    });

    console.log(`Found ${participantsData.length} participants`);

    // Format the participants data
    const formattedParticipants = participantsData.map((p) => ({
      id: p.id,
      playerId: p.playerId,
      displayName: p.displayName || 'Anonymous Player',
      status: p.status || 'active',
      joinedAt: p.joinedAt?.toISOString() || new Date().toISOString(),
      lastActiveAt:
        p.lastActiveAt?.toISOString() || p.joinedAt?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({
      classroom,
      participants: formattedParticipants,
      shouldRedirect,
    });
  } catch (error) {
    console.error('Error fetching classroom participants:', error);
    return NextResponse.json(
      {
        error:
          'Failed to fetch classroom data: ' +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
