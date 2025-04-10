import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { classroomSessions, classroomParticipants } from '@/db/schemas/classroom-schema';
import { eq, and } from 'drizzle-orm';
import { players, users } from '@/db/schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * POST /api/classroom/leave
 * Leave a classroom session
 */
export async function POST(req: NextRequest) {
  try {
    const { classroomId } = await req.json();

    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 });
    }

    let playerRecord;
    let userId;

    // Development mode logic
    if (process.env.NODE_ENV === 'development') {
      // Generate the same browser fingerprint as in the join route
      const browserId = req.headers.get('user-agent') || Math.random().toString(36).substring(2, 15);
      const testEmail = `player-${browserId.substring(0, 10).replace(/[^a-zA-Z0-9]/g, '')}@example.com`;
      
      // Find the user with this browser fingerprint
      const testUser = await db.query.users.findFirst({
        where: eq(users.email, testEmail),
      });
      
      if (!testUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      userId = testUser.id;
      
      // Find the player record for this user
      playerRecord = await db.query.players.findFirst({
        where: eq(players.userId, userId),
      });
      
      if (!playerRecord) {
        return NextResponse.json({ error: 'Player record not found' }, { status: 404 });
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
    }

    // Find the participant record
    const participant = await db.query.classroomParticipants.findFirst({
      where: and(
        eq(classroomParticipants.sessionId, classroomId),
        eq(classroomParticipants.playerId, playerRecord.id)
      ),
    });

    if (!participant) {
      return NextResponse.json({ error: 'You are not a participant in this classroom' }, { status: 404 });
    }

    // Mark the participant as inactive
    await db.update(classroomParticipants)
      .set({
        isActive: false,
        status: 'left'
      })
      .where(eq(classroomParticipants.id, participant.id));

    return NextResponse.json({ 
      success: true, 
      message: 'Left classroom successfully' 
    });
  } catch (error) {
    console.error('Error leaving classroom:', error);
    return NextResponse.json({ 
      error: 'Failed to leave classroom',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
} 