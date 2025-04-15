'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader } from 'lucide-react';

type Classroom = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  maxPlayers: number | null;
  createdAt: string;
  expiresAt: string | null;
};

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxPlayers, setMaxPlayers] = useState<number | undefined>(undefined);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/classroom');
      
      if (!response.ok) {
        // Try to parse error message from the response
        let errorMessage = 'Failed to fetch classrooms';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse the error, use the status text
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (!data.classrooms) {
        throw new Error('Invalid API response format: Missing classrooms data');
      }
      
      setClassrooms(data.classrooms || []);
      setFetchSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error fetching classrooms');
      console.error('Error fetching classrooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setCreateError('Classroom name is required');
      return;
    }
    
    setCreating(true);
    setCreateError(null);
    
    try {
      const response = await fetch('/api/classroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || undefined,
          maxPlayers: maxPlayers || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create classroom');
      }
      
      // Reset form
      setName('');
      setDescription('');
      setMaxPlayers(undefined);
      
      // Update classroom list
      setClassrooms([...classrooms, data.classroom]);
      
      // Switch to the classrooms tab using HTMLElement instead of Element
      const tabElement = document.querySelector('[data-value="classrooms"]');
      if (tabElement && tabElement instanceof HTMLElement) {
        tabElement.click();
      }
    } catch (err: any) {
      setCreateError(err.message || 'Error creating classroom');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Classrooms</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <p className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchClassrooms}
                className="ml-2"
              >
                Try Again
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/debug')}
                className="ml-2"
              >
                Go to Debug Page
              </Button>
            </p>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="classrooms" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="classrooms">My Classrooms</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="classrooms">
          {loading ? (
            <div className="text-center py-8">
              <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading classrooms...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p>Please fix the error above to view your classrooms.</p>
            </div>
          ) : classrooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="mb-4">You don't have any classrooms yet.</p>
              <Button onClick={() => {
                const tabElement = document.querySelector('[data-value="create"]');
                if (tabElement && tabElement instanceof HTMLElement) {
                  tabElement.click();
                }
              }}>
                Create Your First Classroom
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classrooms.map((classroom) => (
                <Card key={classroom.id}>
                  <CardHeader>
                    <CardTitle>{classroom.name}</CardTitle>
                    <CardDescription>
                      Created: {new Date(classroom.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="font-semibold">Code:</p>
                      <p className="text-2xl tracking-wider font-mono bg-secondary p-2 rounded text-center">
                        {classroom.code}
                      </p>
                    </div>
                    {classroom.description && (
                      <p className="text-sm text-muted-foreground">
                        {classroom.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(classroom.code);
                        alert(`Copied code: ${classroom.code}`);
                      }}
                    >
                      Copy Code
                    </Button>
                    <Button onClick={() => router.push(`/teacher/classrooms/${classroom.id}`)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <form onSubmit={handleCreateClassroom}>
              <CardHeader>
                <CardTitle>Create New Classroom</CardTitle>
                <CardDescription>
                  Create a new classroom and generate a unique code for students to join.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Classroom Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Financial Literacy 101"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of this classroom"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Max Players (Optional)</Label>
                  <Input
                    id="maxPlayers"
                    type="number"
                    placeholder="Maximum number of students"
                    min={1}
                    value={maxPlayers || ''}
                    onChange={(e) => setMaxPlayers(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
                {createError && <p className="text-sm text-red-500">{createError}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={creating || !name}>
                  {creating ? 'Creating...' : 'Create Classroom'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 