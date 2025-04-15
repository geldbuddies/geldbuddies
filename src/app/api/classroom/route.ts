import { generateClassroomCode } from '@/lib/utils/classroom-code';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { teachers, users } from '@/server/db/schemas';
import { classroomSessions } from '@/server/db/schemas/classroom-schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/classroom
 * Get all classroom sessions for the authenticated teacher
 */
export async function GET(req: NextRequest) {
  try {
    // For development: skip authentication check and return all classrooms
    if (process.env.NODE_ENV === 'development') {
      const classrooms = await db.query.classroomSessions.findMany();
      return NextResponse.json({
        classrooms,
        debug: {
          note: 'Development mode: Returning all classrooms without auth',
        },
      });
    }

    // Normal auth flow for production
    let userInfo = { isAuthenticated: false, userId: null, hasTeacherRecord: false };
    let classrooms = [];

    try {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });
      userInfo.isAuthenticated = !!session?.user;
      userInfo.userId = session?.user?.id || null;

      if (session?.user?.id) {
        // Find the teacher record for the authenticated user
        const teacherRecord = await db.query.teachers.findFirst({
          where: eq(teachers.userId, session.user.id as any),
        });

        userInfo.hasTeacherRecord = !!teacherRecord;

        if (teacherRecord) {
          classrooms = await db.query.classroomSessions.findMany({
            where: eq(classroomSessions.teacherId, teacherRecord.id),
          });
        } else {
          // If no teacher record found but user is authenticated
          // Return empty array instead of error for now (for testing)
          console.warn('No teacher record found for user ID:', session.user.id);
        }
      }
    } catch (authError) {
      console.error('Auth error:', authError);
      // Continue and return debugging info rather than failing right away
    }

    // In production, enforce proper authentication
    if (!userInfo.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!userInfo.hasTeacherRecord) {
      return NextResponse.json({ error: 'Not a teacher account' }, { status: 403 });
    }

    return NextResponse.json({ classrooms });
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch classrooms',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/classroom
 * Create a new classroom session
 */
export async function POST(req: NextRequest) {
  try {
    // For development: skip authentication check
    let teacherId = 1; // Default teacher ID for testing

    if (process.env.NODE_ENV === 'development') {
      // First, ensure we have a test user in development
      const testUser = await db.query.users.findFirst({
        where: eq(users.email, 'test@example.com'),
      });

      let userId: number;

      if (!testUser) {
        // Create a test user
        const [newUser] = await db
          .insert(users)
          .values({
            name: 'Test Teacher',
            email: 'test@example.com',
            password: 'password',
            role: 'teacher',
          })
          .returning();

        userId = newUser.id;
      } else {
        userId = testUser.id;
      }

      // Check if we have a teacher record for this user
      const testTeacher = await db.query.teachers.findFirst({
        where: eq(teachers.userId, userId),
      });

      if (!testTeacher) {
        // Create a test teacher record
        const [newTeacher] = await db
          .insert(teachers)
          .values({
            userId,
            schoolName: 'Test School',
            subject: 'Financial Education',
          })
          .returning();

        teacherId = newTeacher.id;
      } else {
        teacherId = testTeacher.id;
      }
    } else {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });

      if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Find the teacher record for the authenticated user
      const teacherRecord = await db.query.teachers.findFirst({
        where: eq(teachers.userId, session.user.id as any),
      });

      if (!teacherRecord) {
        return NextResponse.json({ error: 'Not a teacher account' }, { status: 403 });
      }

      teacherId = teacherRecord.id;
    }

    const { name, description, maxPlayers, expiresAt } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Classroom name is required' }, { status: 400 });
    }

    // Generate a unique classroom code
    let code = generateClassroomCode();
    let isUnique = false;

    // Ensure the code is unique
    while (!isUnique) {
      const existingSession = await db.query.classroomSessions.findFirst({
        where: eq(classroomSessions.code, code),
      });

      if (!existingSession) {
        isUnique = true;
      } else {
        code = generateClassroomCode();
      }
    }

    // Create the classroom session
    const [newClassroom] = await db
      .insert(classroomSessions)
      .values({
        teacherId,
        name,
        code,
        description,
        maxPlayers,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      })
      .returning();

    return NextResponse.json({ classroom: newClassroom });
  } catch (error) {
    console.error('Error creating classroom:', error);
    return NextResponse.json(
      {
        error: 'Failed to create classroom',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
