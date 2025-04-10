'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { RefreshCw, Clock, LogOut } from 'lucide-react';

type Participant = {
  id: number;
  displayName: string | null;
  status: string;
  joinedAt: string;
};

type Classroom = {
  id: number;
  name: string;
  code: string;
  description: string | null;
};

const REFRESH_INTERVAL = 15; // seconds

export default function ClassroomPage() {
  const params = useParams();
  const id = params.id as string;
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Simple function to fetch data
  const fetchData = useCallback(async (showLoadingState = false) => {
    try {
      if (showLoadingState) {
        setRefreshing(true);
      }
      
      const response = await fetch(`/api/classroom/${id}/participants`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch classroom data');
      }
      
      const data = await response.json();
      setClassroom(data.classroom);
      setParticipants(data.participants);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error(err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [id]);

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

  // Handle leaving the classroom
  const handleLeaveClassroom = async () => {
    if (confirm('Are you sure you want to leave this classroom?')) {
      try {
        setRefreshing(true);
        
        // Call the leave API
        const response = await fetch('/api/classroom/leave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            classroomId: id
          }),
        });
        
        if (response.ok) {
          // Redirect to join page
          router.push('/join');
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to leave classroom');
        }
      } catch (err) {
        console.error('Error leaving classroom:', err);
        // Redirect anyway even if the API call fails
        router.push('/join');
      } finally {
        setRefreshing(false);
      }
    }
  };

  // Main rendering
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
      <div className="mb-8 flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold mb-2">{classroom.name}</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLeaveClassroom}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Leave</span>
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
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-start gap-2">
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
              <p className="text-sm">Share the class code with students.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((participant) => (
                <Card key={participant.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold">
                        {getInitials(participant.displayName || 'Anonymous')}
                      </div>
                      <div>
                        <p className="font-medium">{participant.displayName || 'Anonymous'}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {formatTime(participant.joinedAt)}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge 
                          variant={participant.status === 'active' ? 'default' : 'outline'}
                          className="text-xs capitalize"
                        >
                          {participant.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
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
        <Button variant="outline" onClick={() => router.back()}>
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
      <Button onClick={() => router.push('/join')}>
        Join a Different Classroom
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