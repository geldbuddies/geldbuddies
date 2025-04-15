'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidClassroomCode } from '@/lib/utils/classroom-code';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

export function ClassroomCodeEntry() {
  const [code, setCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [classroomName, setClassroomName] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckCode = async () => {
    if (!code) {
      setError('Please enter a classroom code');
      return;
    }

    // Convert to uppercase for consistency
    const formattedCode = code.toUpperCase();

    if (!isValidClassroomCode(formattedCode)) {
      setError('Invalid classroom code format');
      return;
    }

    setError(null);
    setIsChecking(true);

    try {
      const response = await fetch(`/api/classroom/check?code=${formattedCode}`);
      const data = await response.json();

      if (data.valid) {
        setClassroomName(data.name);
      } else {
        setError(data.error || 'Invalid classroom code');
      }
    } catch (err) {
      setError('Failed to check classroom code');
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleJoinClassroom = async () => {
    if (!code || !classroomName) return;

    setIsJoining(true);

    try {
      const response = await fetch('/api/classroom/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.toUpperCase(),
          displayName: displayName || undefined,
          email: email!,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the classroom page
        router.push(`/classroom/${data.classroom.id}`);
      } else {
        setError(data.error || 'Failed to join classroom');
      }
    } catch (err) {
      setError('Failed to join classroom');
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join Classroom</CardTitle>
        <CardDescription>Enter the classroom code provided by your teacher</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="code">Classroom Code</Label>
            <Input
              id="code"
              placeholder="Enter 6-8 character code (e.g., ABC123)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              className="text-center text-xl tracking-wider uppercase"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            {classroomName && (
              <p className="text-sm text-green-600 mt-1">Classroom found: {classroomName}</p>
            )}
          </div>

          {classroomName && (
            <Fragment>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="displayName">Your Display Name (Optional)</Label>
                <Input
                  id="displayName"
                  placeholder="How others will see you"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to use your account name
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  Make sure to use your real email so you can login later.
                </p>
              </div>
            </Fragment>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!classroomName ? (
          <Button onClick={handleCheckCode} disabled={!code || isChecking} className="w-full">
            {isChecking ? 'Checking...' : 'Check Code'}
          </Button>
        ) : (
          <Button onClick={handleJoinClassroom} disabled={isJoining} className="w-full">
            {isJoining ? 'Joining...' : 'Join Classroom'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
