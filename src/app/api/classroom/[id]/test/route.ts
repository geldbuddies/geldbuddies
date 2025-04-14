import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  // Properly await the params object
  const params = await Promise.resolve(context.params);
  const { id } = params;
  
  return NextResponse.json({
    received: true,
    params,
    id,
    url: req.url,
    parsedId: id ? parseInt(id, 10) : null,
  });
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  // Properly await the params object
  const params = await Promise.resolve(context.params);
  const { id } = params;
  
  return NextResponse.json({
    received: true,
    method: 'DELETE',
    params,
    id,
    url: req.url,
    parsedId: id ? parseInt(id, 10) : null,
  });
} 