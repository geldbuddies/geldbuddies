import { isValidClassroomCode } from '@/lib/utils/classroom-code';
import { db } from '@/server/db';
import { classroomSessions } from '@/server/db/schemas/classroom-schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/classroom/check?code=ABCDEF
 * Check if a classroom code is valid without requiring authentication
 */
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code || !isValidClassroomCode(code)) {
      return NextResponse.json({ valid: false, error: 'Invalid classroom code format' });
    }

    // Find the classroom session by code
    const classroomSession = await db.query.classroomSessions.findFirst({
      where: eq(classroomSessions.code, code),
    });

    if (!classroomSession) {
      return NextResponse.json({ valid: false, error: 'Classroom not found' });
    }

    if (!classroomSession.isActive) {
      return NextResponse.json({
        valid: false,
        error: 'This classroom session is no longer active',
      });
    }

    if (classroomSession.expiresAt && new Date(classroomSession.expiresAt) < new Date()) {
      return NextResponse.json({ valid: false, error: 'This classroom session has expired' });
    }

    return NextResponse.json({
      valid: true,
      name: classroomSession.name,
      // Only return minimal information for security
      hasLimit: !!classroomSession.maxPlayers,
    });
  } catch (error) {
    console.error('Error checking classroom code:', error);
    return NextResponse.json(
      { valid: false, error: 'Failed to check classroom code' },
      { status: 500 }
    );
  }
}
