import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { classroomSessions, classroomParticipants } from '@/db/schemas/classroom-schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Properly await the params object
    const params = await Promise.resolve(context.params);
    const { id } = params;
    
    // Debug info
    console.log('DELETE request received for classroom ID:', id);
    console.log('Request URL:', req.url);
    
    const classroomId = parseInt(id, 10);

    // Validate input
    if (isNaN(classroomId)) {
      console.error('Invalid classroom ID:', id);
      return NextResponse.json(
        { error: 'Invalid classroom ID' },
        { status: 400 }
      );
    }

    console.log('Deleting classroom with ID:', classroomId);

    try {
      // First delete all participants from this classroom
      const deleteParticipantsResult = await db.delete(classroomParticipants)
        .where(eq(classroomParticipants.sessionId, classroomId));
      
      console.log('Participants deletion result:', deleteParticipantsResult);
    } catch (err) {
      console.error('Error deleting participants:', err);
      // Continue with classroom deletion even if participant deletion fails
    }

    try {
      // Now delete the classroom itself
      const deleteClassroomResult = await db.delete(classroomSessions)
        .where(eq(classroomSessions.id, classroomId));
      
      console.log('Classroom deletion result:', deleteClassroomResult);
      
      if (!deleteClassroomResult) {
        return NextResponse.json(
          { error: 'Classroom not found or could not be deleted' },
          { status: 404 }
        );
      }
    } catch (err) {
      console.error('Error deleting classroom:', err);
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: 'Classroom permanently deleted',
      id: classroomId
    });
  } catch (error) {
    console.error('Error in DELETE endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete classroom: ' + (error instanceof Error ? error.message : String(error)),
        requestUrl: req.url
      },
      { status: 500 }
    );
  }
} 