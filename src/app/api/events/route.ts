import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      // Function to send a random job update
      const sendJobUpdate = () => {
        const jobs = [
          { title: 'Software Developer', company: 'Tech Corp', salary: 60000 },
          { title: 'Data Analyst', company: 'Data Inc', salary: 55000 },
          { title: 'Project Manager', company: 'Management Co', salary: 65000 }
        ];
        
        const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        const data = `data: ${JSON.stringify(randomJob)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"connection": "established"}\n\n'));

      // Send job updates every 3 seconds
      const interval = setInterval(sendJobUpdate, 3000);

      // Clean up on close
      return () => {
        clearInterval(interval);
      };
    }
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 