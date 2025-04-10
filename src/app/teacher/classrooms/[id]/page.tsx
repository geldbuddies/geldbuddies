'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { RefreshCw, Clock, Trash2, UserX, AlertCircle, UserPlus, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

type Participant = {
  id: number;
  playerId: number;
  displayName: string | null;
  status: string;
  joinedAt: string;
  lastActiveAt: string;
};

type Classroom = {
  id: number;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
  maxPlayers: number | null;
  createdAt: string;
  expiresAt: string | null;
};

const REFRESH_INTERVAL = 15; // seconds

export default function TeacherClassroomPage() {
  const params = useParams();
  const id = params.id as string;
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [confirmClassroomDelete, setConfirmClassroomDelete] = useState(false);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  
  // Keep track of participants to detect new ones
  const previousParticipantsRef = useRef<Participant[]>([]);
  
  // Keep track of new participants to highlight them
  const [newParticipantIds, setNewParticipantIds] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<{id: number, message: string, type: 'success' | 'info' | 'error'}[]>([]);
  
  // Function to show notification
  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);
  
  // Function to fetch data
  const fetchData = useCallback(async (showLoadingState = false) => {
    try {
      if (showLoadingState) {
        setRefreshing(true);
      }
      
      const response = await fetch(`/api/classroom/${id}/participants`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch classroom data');
      }
      
      const data = await response.json();
      setClassroom(data.classroom);
      
      // Store the current participant count
      const prevCount = previousParticipantsRef.current.length;
      const newCount = data.participants.length;
      
      // Check for new participants - simpler approach
      let hasNewParticipants = false;
      
      if (prevCount > 0 && newCount > prevCount) {
        // We definitely have new participants
        hasNewParticipants = true;
        console.log(`New participants detected: ${prevCount} → ${newCount}`);
      } else {
        // Check for new IDs that weren't there before
        const prevIds = new Set(previousParticipantsRef.current.map(p => p.id));
        const newParticipantsList = data.participants.filter(p => !prevIds.has(p.id));
        
        if (newParticipantsList.length > 0) {
          hasNewParticipants = true;
          console.log(`Found ${newParticipantsList.length} participants with new IDs`);
          
          // Add notifications for these new participants
          newParticipantsList.forEach((participant: Participant) => {
            showNotification(`${participant.displayName || 'Anonymous'} has joined the classroom.`, 'success');
          });
          
          // Highlight the new participants
          setNewParticipantIds(prev => [
            ...prev,
            ...newParticipantsList.map(p => p.id)
          ]);
        }
      }
      
      // Check for new participants (without playing sound)
      if (hasNewParticipants && prevCount > 0) {
        console.log('New participants detected');
      }
      
      // Update participants state
      setParticipants(data.participants);
      // Update reference for next check
      previousParticipantsRef.current = data.participants;
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error(err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [id, showNotification]);

  // Function to handle manual refresh
  const handleManualRefresh = () => {
    // Clear any existing timers to avoid overlap
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
    
    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }
    
    // Fetch data immediately
    fetchData(true);
    
    // If auto-refresh is enabled, restart the countdown
    if (autoRefresh) {
      setCountdown(REFRESH_INTERVAL);
      startCountdown();
    }
  };

  // Start the countdown timer
  const startCountdown = useCallback(() => {
    // Clear any existing countdown timer
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
    }
    
    // Set up a new countdown
    countdownTimer.current = setInterval(() => {
      setCountdown(prev => {
        const next = prev - 1;
        if (next <= 0) {
          // When countdown reaches zero, clear the interval
          clearInterval(countdownTimer.current!);
          return 0;
        }
        return next;
      });
    }, 1000);
  }, []);

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    const newState = !autoRefresh;
    setAutoRefresh(newState);
    
    // Clear existing timers
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
    
    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }
    
    // If enabling auto-refresh, reset countdown and start it
    if (newState) {
      setCountdown(REFRESH_INTERVAL);
      startCountdown();
      
      // Set up the refresh timer
      refreshTimer.current = setTimeout(() => {
        fetchData(false);
      }, REFRESH_INTERVAL * 1000);
    }
  };

  // Handle participant removal
  const handleRemoveParticipant = async (participantId: number) => {
    try {
      setRefreshing(true);
      
      // Find the participant being removed
      const participant = participants.find(p => p.id === participantId);
      
      const response = await fetch('/api/classroom/participant/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          participantId,
          redirectToHome: true // Add a flag to indicate redirection
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove participant');
      }
      
      // Show notification for removed participant
      if (participant) {
        showNotification(`${participant.displayName || 'Anonymous'} has been removed from the classroom.`, 'info');
      }
      
      // Refresh the data to get updated participant list
      fetchData(false);
      
      // Close confirmation dialog
      setConfirmDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to remove participant');
      showNotification(`Failed to remove participant: ${err.message}`, 'error');
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle classroom deletion
  const handleDeleteClassroom = async () => {
    if (!classroom) return;
    
    try {
      setRefreshing(true);
      
      // First test the endpoint with the test route
      console.log('Testing DELETE with ID:', id);
      const testResponse = await fetch(`/api/classroom/${id}/test`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const testData = await testResponse.json();
      console.log('Test DELETE response:', testData);
      
      // Now try the real deletion
      console.log('Attempting real DELETE for classroom ID:', id);
      const response = await fetch(`/api/classroom/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete classroom:', errorData);
        throw new Error(errorData.error || `Failed to delete classroom: ${response.status}`);
      }
      
      // Successful deletion
      const data = await response.json();
      console.log('Deletion successful:', data);
      
      // Wait a moment before redirecting
      setTimeout(() => {
        // Redirect back to classroom list
        router.push('/teacher/classrooms');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete classroom');
      showNotification(`Failed to delete classroom: ${err.message}`, 'error');
      console.error('Deletion error:', err);
      
      // Close the delete dialog but stay on the page to show the error
      setConfirmClassroomDelete(false);
    } finally {
      setRefreshing(false);
    }
  };

  // Watch countdown for scheduling next fetch
  useEffect(() => {
    // Only proceed if auto-refresh is enabled
    if (!autoRefresh) return;
    
    // When countdown reaches 0 and we're not already refreshing
    if (countdown === 0 && !refreshing && !loading) {
      // Fetch data
      fetchData(false);
      
      // Reset countdown
      setCountdown(REFRESH_INTERVAL);
      
      // Start the countdown again
      startCountdown();
    }
  }, [countdown, autoRefresh, refreshing, loading, fetchData, startCountdown]);

  // Initial data loading
  useEffect(() => {
    // Load classroom data on mount
    fetchData(true);
    
    // If auto-refresh is enabled, start the countdown
    if (autoRefresh) {
      setCountdown(REFRESH_INTERVAL);
      startCountdown();
    }
    
    // Clean up all timers when unmounting
    return () => {
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
    };
  }, [fetchData, autoRefresh, startCountdown]);

  // Remove highlight after 10 seconds
  useEffect(() => {
    if (newParticipantIds.length > 0) {
      const timer = setTimeout(() => {
        setNewParticipantIds([]);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [newParticipantIds]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleManualRefresh} />;
  }

  if (!classroom) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg transform transition-all duration-500 animate-in fade-in slide-in-from-right-5 max-w-sm ${
              notification.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : notification.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-white border border-gray-200 text-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' && (
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <UserPlus className="h-4 w-4 text-green-600" />
                </div>
              )}
              {notification.type === 'error' && (
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
              )}
              <div className="flex-1">
                <p>{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold mb-2">{classroom.name}</h1>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setConfirmClassroomDelete(true)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Classroom</span>
            </Button>
          </div>
          {classroom.description && (
            <p className="text-muted-foreground">{classroom.description}</p>
          )}
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="text-sm py-1">
              Code: {classroom.code}
            </Badge>
            <Badge variant="outline" className="text-sm py-1">
              {participants.length} {participants.length === 1 ? 'Participant' : 'Participants'}
            </Badge>
            {classroom.maxPlayers && (
              <Badge variant="outline" className="text-sm py-1">
                Max capacity: {classroom.maxPlayers}
              </Badge>
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-start gap-2">
          <Button 
            variant={autoRefresh ? "default" : "outline"} 
            size="sm"
            onClick={toggleAutoRefresh}
            className="flex items-center gap-1"
          >
            {autoRefresh ? (
              <>
                <Clock className="h-4 w-4" />
                <span>Auto: {countdown}s</span>
              </>
            ) : (
              'Enable Auto-refresh'
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Now'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classroom Participants</CardTitle>
          <CardDescription>
            All students currently joined in this classroom
          </CardDescription>
        </CardHeader>
        <CardContent>
          {participants.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No participants have joined yet.</p>
              <p className="text-sm">Share the class code with students: <span className="font-mono font-bold">{classroom.code}</span></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((participant) => (
                <Card 
                  key={participant.id} 
                  className={`overflow-hidden transition-all duration-1000 ${
                    newParticipantIds.includes(participant.id) 
                      ? 'bg-green-50 border-green-500 animate-pulse' 
                      : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-lg font-semibold ${
                        newParticipantIds.includes(participant.id)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-primary/10'
                      }`}>
                        {getInitials(participant.displayName || 'Anonymous')}
                      </div>
                      <div>
                        <div className="font-medium">
                          {participant.displayName || 'Anonymous'}
                          {newParticipantIds.includes(participant.id) && (
                            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Joined {formatTime(participant.joinedAt)}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => setConfirmDelete(participant.id)}
                        >
                          <UserX className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Student Removal */}
      {confirmDelete && (
        <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Student</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this student from the classroom?
                They will be notified and can rejoin later if needed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => handleRemoveParticipant(confirmDelete)}
                disabled={refreshing}
              >
                {refreshing ? 'Removing...' : 'Remove Student'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Dialog for Classroom Deletion */}
      <Dialog open={confirmClassroomDelete} onOpenChange={setConfirmClassroomDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Classroom</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this classroom? This action cannot be undone.
              All students will be removed from the classroom.
            </DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting this classroom will remove all student progress and data associated with it.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmClassroomDelete(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteClassroom}
              disabled={refreshing}
            >
              {refreshing ? 'Deleting...' : 'Delete Classroom'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-6 w-full max-w-xl" />
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-3 w-20 mt-1" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string, onRetry: () => void }) {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Error Loading Classroom</h2>
      <p className="text-muted-foreground mb-8">{error}</p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => router.push('/teacher/classrooms')}>
          Go Back
        </Button>
        <Button onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}

function EmptyState() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Classroom Not Found</h2>
      <p className="text-muted-foreground mb-8">The classroom you're looking for doesn't exist or has been deleted.</p>
      <Button onClick={() => router.push('/teacher/classrooms')}>
        Return to Classrooms
      </Button>
    </div>
  );
}

// Helper function to get initials from display name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Helper function to format time
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  }
} 