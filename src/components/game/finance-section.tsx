import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { HistoryEvent } from '@/store/game/types';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function FinanceSection() {
  const { history } = useGameStore();

  // Filter financial transactions
  const transactions = history.events.filter(
    (event) => event.type === 'transaction' && event.amount !== undefined
  ) as (HistoryEvent & { amount: number })[];

  // Calculate total income and expenses
  const { income, expenses } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expenses += Math.abs(transaction.amount);
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Financieel Overzicht</CardTitle>
          <CardDescription>Overzicht van je inkomsten en uitgaven</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Totale Inkomsten</h3>
              <p className="text-2xl font-bold text-green-500">€{income.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Totale Uitgaven</h3>
              <p className="text-2xl font-bold text-red-500">€{expenses.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transactiegeschiedenis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${
                      transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}€{transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nog geen transacties om weer te geven
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 