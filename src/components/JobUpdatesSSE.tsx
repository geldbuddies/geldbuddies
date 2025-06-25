'use client';

import { useEffect, useState } from 'react';

interface JobUpdate {
  title: string;
  company: string;
  salary: number;
}

export default function JobUpdatesSSE() {
  const [updates, setUpdates] = useState<JobUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.connection === 'established') {
        setIsConnected(true);
        return;
      }

      setUpdates((prev) => [data, ...prev].slice(0, 5)); // Keep last 5 updates
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Real-time Job Updates</h2>
      <div className="mb-2">
        Status: <span className={isConnected ? "text-green-500" : "text-red-500"}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded border">
            <h3 className="font-semibold">{update.title}</h3>
            <p className="text-gray-600">{update.company}</p>
            <p className="text-green-600">€{update.salary.toLocaleString()}/year</p>
          </div>
        ))}
      </div>
    </div>
  );
} 