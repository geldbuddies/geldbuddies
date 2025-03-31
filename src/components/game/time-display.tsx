'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/hooks/use-game';
import { formatDate } from '@/lib/utils';

export function TimeDisplay() {
  const { month, year, advanceMonth } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Date</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatDate(month, year)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => advanceMonth()} className="w-full">
          Next Month
        </Button>
      </CardFooter>
    </Card>
  );
}
