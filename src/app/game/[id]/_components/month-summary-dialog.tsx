import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MonthSummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  events: Array<{
    id: string;
    type: 'transaction' | 'job' | 'asset' | 'good' | 'life';
    description: string;
    amount?: number;
    timestamp: number;
  }>;
}

export function MonthSummaryDialog({ isOpen, onClose, events }: MonthSummaryDialogProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Calculate statistics
  const stats = events.reduce(
    (acc, event) => {
      if (event.amount) {
        if (event.amount > 0) {
          acc.income += event.amount;
          acc.incomeCount++;
        } else {
          acc.expenses += Math.abs(event.amount);
          acc.expenseCount++;
        }
      }
      acc.totalEvents++;
      return acc;
    },
    { income: 0, expenses: 0, incomeCount: 0, expenseCount: 0, totalEvents: 0 }
  );

  useEffect(() => {
    if (isOpen) {
      const now = Date.now();
      setStartTime(now);
      setTimeLeft(30);
    } else {
      setStartTime(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || startTime === null) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(30 - elapsed, 0);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        onClose();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, startTime, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <DialogTitle>Samenvatting afgelopen maand</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-blue-500/10 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-500">Auto-close in {timeLeft}s</span>
            </div>
            <div className="flex-1">
              <Progress value={(timeLeft / 30) * 100} className="h-2 bg-blue-500/20" />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp className="size-4" />
                <span className="font-medium">Income</span>
              </div>
              <div className="pl-6">
                <p className="text-2xl font-bold">${stats.income.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stats.incomeCount} transactions</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <TrendingDown className="size-4" />
                <span className="font-medium">Expenses</span>
              </div>
              <div className="pl-6">
                <p className="text-2xl font-bold">${stats.expenses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stats.expenseCount} transactions</p>
              </div>
            </div>
            <div className="col-span-2 pt-2 border-t">
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-primary" />
                <span className="font-medium">Net Change</span>
              </div>
              <div className="pl-6">
                <p
                  className={`text-2xl font-bold ${
                    stats.income - stats.expenses >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  ${(stats.income - stats.expenses).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{stats.totalEvents} total events</p>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {events.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No events this month</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border bg-muted/50">
                    <p className="font-medium">{event.description}</p>
                    {event.amount !== undefined && (
                      <p
                        className={`text-sm ${
                          event.amount >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {event.amount >= 0 ? '+' : '-'}${Math.abs(event.amount).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
