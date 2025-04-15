import { authOptions } from '@/lib/auth';
import { isValidClassroomCode } from '@/lib/utils/classroom-code';
import { db } from '@/server/db';
import { players, users } from '@/server/db/schemas';
import { classroomParticipants, classroomSessions } from '@/server/db/schemas/classroom-schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/classroom/join
 * Join a classroom session using a code
 */
export async function POST(req: NextRequest) {
  try {
    const { code, displayName } = await req.json();

    if (!code || !isValidClassroomCode(code)) {
      return NextResponse.json({ error: 'Invalid classroom code' }, { status: 400 });
    }

    // Find the classroom session by code
    const classroomSession = await db.query.classroomSessions.findFirst({
      where: eq(classroomSessions.code, code),
    });

    if (!classroomSession) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
    }

    if (!classroomSession.isActive) {
      return NextResponse.json(
        { error: 'This classroom session is no longer active' },
        { status: 400 }
      );
    }

    if (classroomSession.expiresAt && new Date(classroomSession.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'This classroom session has expired' }, { status: 400 });
    }

    // Variables for player information
    let playerRecord;
    let userId;
    let finalDisplayName = displayName || 'Test Player';
    let browserUniqueId: string | undefined;

    // Development mode: Create test player if needed
    if (process.env.NODE_ENV === 'development') {
      // Get or create a unique browser ID from cookies
      browserUniqueId = req.cookies.get('browser_id')?.value;

      // If no cookie exists, create a new unique ID
      if (!browserUniqueId) {
        // Generate a completely random ID
        browserUniqueId =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          Date.now().toString(36);
      }

      // Add some randomness from the user agent too
      const userAgent = req.headers.get('user-agent') || '';
      const agentHash = userAgent
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
        .toString(36);

      // Create a unique email based on this browser ID
      const testEmail = `player-${browserUniqueId.substring(0, 8)}-${agentHash.substring(
        0,
        4
      )}@example.com`;

      console.log(`Creating/finding player with email: ${testEmail}`);

      // Look for existing player with this unique ID
      const testUser = await db.query.users.findFirst({
        where: eq(users.email, testEmail),
      });

      if (!testUser) {
        // Create a unique test player user for this browser
        const [newUser] = await db
          .insert(users)
          .values({
            name: `Player ${browserUniqueId.substring(0, 5).toUpperCase()}`,
            email: testEmail,
            password: 'password',
            role: 'player',
          })
          .returning();

        userId = newUser.id;
      } else {
        userId = testUser.id;
      }

      // Check if we have a player record for this user
      playerRecord = await db.query.players.findFirst({
        where: eq(players.userId, userId),
      });

      if (!playerRecord) {
        // Create a test player record
        const [newPlayer] = await db
          .insert(players)
          .values({
            userId,
            balance: 1000.0,
            educationLevel: 'High School',
            income: 0.0,
            isActive: true,
          })
          .returning();

        playerRecord = newPlayer;
      }

      // Use the provided display name or a generated one
      finalDisplayName = displayName || `Player ${playerRecord.id}`;

      // Create a response that will be returned later
      const response = NextResponse.next();

      // Set the browser_id cookie if it doesn't exist yet
      if (!req.cookies.get('browser_id')) {
        response.cookies.set('browser_id', browserUniqueId, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
        });
      }
    } else {
      // Production mode: Use authentication
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Find the player record for the authenticated user
      playerRecord = await db.query.players.findFirst({
        where: eq(players.userId, session.user.id as any),
      });

      if (!playerRecord) {
        return NextResponse.json({ error: 'Not a player account' }, { status: 403 });
      }

      // Get user information for display name
      const userRecord = await db.query.users.findFirst({
        where: eq(users.id, session.user.id as any),
      });

      finalDisplayName = displayName || userRecord?.name || 'Anonymous Player';
    }

    // Check if the player has already joined this classroom
    const existingParticipant = await db.query.classroomParticipants.findFirst({
      where: and(
        eq(classroomParticipants.sessionId, classroomSession.id),
        eq(classroomParticipants.playerId, playerRecord.id)
      ),
    });

    if (existingParticipant) {
      if (existingParticipant.isActive) {
        // Update last active time and display name if provided
        await db
          .update(classroomParticipants)
          .set({
            lastActiveAt: new Date(),
            displayName: displayName || existingParticipant.displayName,
          })
          .where(eq(classroomParticipants.id, existingParticipant.id));

        // Get all active participants in this classroom
        const participants = await getClassroomParticipants(classroomSession.id);

        // Create response
        const response = NextResponse.json({
          message: 'Already joined this classroom',
          classroom: classroomSession,
          participants,
        });

        // Set the browser_id cookie if needed
        if (
          process.env.NODE_ENV === 'development' &&
          !req.cookies.get('browser_id') &&
          browserUniqueId
        ) {
          response.cookies.set('browser_id', browserUniqueId, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
        }

        return response;
      } else {
        // Reactivate the participant
        await db
          .update(classroomParticipants)
          .set({
            isActive: true,
            lastActiveAt: new Date(),
            displayName: displayName || existingParticipant.displayName,
          })
          .where(eq(classroomParticipants.id, existingParticipant.id));

        // Get all active participants in this classroom
        const participants = await getClassroomParticipants(classroomSession.id);

        // Create response
        const response = NextResponse.json({
          message: 'Rejoined classroom successfully',
          classroom: classroomSession,
          participants,
        });

        // Set the browser_id cookie if needed
        if (
          process.env.NODE_ENV === 'development' &&
          !req.cookies.get('browser_id') &&
          browserUniqueId
        ) {
          response.cookies.set('browser_id', browserUniqueId, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          });
        }

        return response;
      }
    }

    // Check if the classroom has reached max players
    if (classroomSession.maxPlayers) {
      const currentParticipantsCount = await db.query.classroomParticipants
        .findMany({
          where: and(
            eq(classroomParticipants.sessionId, classroomSession.id),
            eq(classroomParticipants.isActive, true)
          ),
        })
        .then((participants) => participants.length);

      if (currentParticipantsCount >= classroomSession.maxPlayers) {
        return NextResponse.json({ error: 'Classroom is full' }, { status: 400 });
      }
    }

    // Add the player to the classroom
    await db.insert(classroomParticipants).values({
      sessionId: classroomSession.id,
      playerId: playerRecord.id,
      displayName: finalDisplayName,
      lastActiveAt: new Date(),
    });

    // Get all active participants in this classroom
    const participants = await getClassroomParticipants(classroomSession.id);

    // Create the response
    const response = NextResponse.json({
      message: 'Joined classroom successfully',
      classroom: classroomSession,
      participants,
    });

    // Set the browser_id cookie if in development mode and it doesn't exist yet
    if (
      process.env.NODE_ENV === 'development' &&
      !req.cookies.get('browser_id') &&
      browserUniqueId
    ) {
      response.cookies.set('browser_id', browserUniqueId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
      });
    }

    return response;
  } catch (error) {
    console.error('Error joining classroom:', error);
    return NextResponse.json(
      {
        error: 'Failed to join classroom',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to get all active participants in a classroom
 */
async function getClassroomParticipants(classroomId: number) {
  const participants = await db.query.classroomParticipants.findMany({
    where: and(
      eq(classroomParticipants.sessionId, classroomId),
      eq(classroomParticipants.isActive, true)
    ),
    orderBy: (participants) => [participants.joinedAt],
  });

  return participants;
}
