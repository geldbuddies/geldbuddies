import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { classroomParticipants, classroomSessions } from '@/server/db/schemas/classroom-schema';
import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/classroom/[id]/start-game
 * Start a game by updating all participants to redirect to game page
 */
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    // Get the classroom ID from the URL params
    const params = await Promise.resolve(context.params);
    const { id } = params;

    // Skip authentication check in development
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });

      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const classroomId = parseInt(id, 10);

    // Validate input
    if (isNaN(classroomId)) {
      return NextResponse.json({ error: 'Invalid classroom ID' }, { status: 400 });
    }

    // Get target URL from request body
    const { targetUrl } = await req.json();

    if (!targetUrl || typeof targetUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid target URL' }, { status: 400 });
    }

    console.log(`Starting game for classroom ID: ${classroomId}, redirecting to: ${targetUrl}`);

    // Find the classroom
    const classroom = await db.query.classroomSessions.findFirst({
      where: eq(classroomSessions.id, classroomId),
      columns: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    if (!classroom) {
      return NextResponse.json(
        { error: 'Classroom not found or you do not have permission to start the game' },
        { status: 404 }
      );
    }

    if (!classroom.isActive) {
      return NextResponse.json(
        { error: 'Cannot start game for an inactive classroom' },
        { status: 400 }
      );
    }

    // Get all active participants
    const participants = await db.query.classroomParticipants.findMany({
      where: and(
        eq(classroomParticipants.sessionId, classroomId),
        eq(classroomParticipants.isActive, true)
      ),
      columns: {
        id: true,
      },
    });

    console.log(`Found ${participants.length} active participants in classroom`);

    // Update the classroom status to 'game'
    await db
      .update(classroomSessions)
      .set({
        status: 'game',
        // @ts-ignore - metadata field usage pattern from other routes
        metadata: JSON.stringify({
          gameInProgress: true,
          gameStartedAt: new Date().toISOString(),
          gameUrl: targetUrl,
        }),
      })
      .where(eq(classroomSessions.id, classroomId));

    return NextResponse.json({
      success: true,
      classroom: classroom.name,
      participantsCount: participants.length,
      message: `Game started with ${participants.length} participants`,
    });
  } catch (error) {
    console.error('Error starting game for classroom:', error);
    return NextResponse.json(
      {
        error: 'Failed to start game: ' + (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
