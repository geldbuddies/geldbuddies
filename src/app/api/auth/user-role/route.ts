import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { users } from '@/server/db/schemas';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ 
      headers: headersList
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's role from the database
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id as any),
      columns: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('Error getting user role:', error);
    return NextResponse.json(
      { error: 'Failed to get user role' },
      { status: 500 }
    );
  }
} 