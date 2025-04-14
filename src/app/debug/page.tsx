'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [classroomsData, setClassroomsData] = useState<any>(null);
  const [loading, setLoading] = useState({
    test: false,
    classrooms: false
  });
  const [error, setError] = useState({
    test: null as string | null,
    classrooms: null as string | null
  });

  const runDbTest = async () => {
    try {
      setLoading(prev => ({ ...prev, test: true }));
      setError(prev => ({ ...prev, test: null }));
      
      const res = await fetch('/api/classroom/test');
      const data = await res.json();
      
      setTestResults(data);
    } catch (err: any) {
      setError(prev => ({ ...prev, test: err.message || 'Unknown error' }));
    } finally {
      setLoading(prev => ({ ...prev, test: false }));
    }
  };

  const fetchClassrooms = async () => {
    try {
      setLoading(prev => ({ ...prev, classrooms: true }));
      setError(prev => ({ ...prev, classrooms: null }));
      
      const res = await fetch('/api/classroom');
      const data = await res.json();
      
      setClassroomsData(data);
    } catch (err: any) {
      setError(prev => ({ ...prev, classrooms: err.message || 'Unknown error' }));
    } finally {
      setLoading(prev => ({ ...prev, classrooms: false }));
    }
  };

  // Run the test automatically when the page loads
  useEffect(() => {
    runDbTest();
    fetchClassrooms();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>
      
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Database Connection Test</CardTitle>
            <CardDescription>
              Testing basic database connectivity and queries
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.test ? (
              <p>Testing database connection...</p>
            ) : error.test ? (
              <p className="text-red-500">Error: {error.test}</p>
            ) : testResults ? (
              <div>
                <p className="mb-2">
                  <span className="font-bold">Status:</span>{' '}
                  <span className={testResults.success ? 'text-green-500' : 'text-red-500'}>
                    {testResults.success ? 'Success' : 'Failed'}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-bold">Message:</span> {testResults.message}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Classrooms:</span> {testResults.count || 0}
                </p>
                {testResults.error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="font-bold text-red-600">Error: {testResults.error}</p>
                    {testResults.stack && (
                      <pre className="mt-2 text-xs overflow-auto p-2 bg-red-100">
                        {testResults.stack}
                      </pre>
                    )}
                  </div>
                )}
                {testResults.firstFew && testResults.firstFew.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">First few classrooms:</p>
                    <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-60">
                      {JSON.stringify(testResults.firstFew, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p>No test results yet</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={runDbTest} disabled={loading.test}>
              {loading.test ? 'Testing...' : 'Run Test Again'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classroom API Test</CardTitle>
            <CardDescription>
              Testing the classroom API endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.classrooms ? (
              <p>Loading classrooms data...</p>
            ) : error.classrooms ? (
              <p className="text-red-500">Error: {error.classrooms}</p>
            ) : classroomsData ? (
              <div>
                <p className="mb-2">
                  <span className="font-bold">Classrooms:</span>{' '}
                  {classroomsData.classrooms?.length || 0}
                </p>
                <div className="mt-4">
                  <p className="font-bold mb-2">Response data:</p>
                  <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(classroomsData, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p>No classroom data yet</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={fetchClassrooms} disabled={loading.classrooms}>
              {loading.classrooms ? 'Loading...' : 'Fetch Classrooms'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 