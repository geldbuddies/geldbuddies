'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/hooks/use-game';

export function TimeDisplay() {
  const { formatDate, nextMonth } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Date</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatDate()}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={nextMonth} className="w-full">
          Next Month
        </Button>
      </CardFooter>
    </Card>
  );
}
