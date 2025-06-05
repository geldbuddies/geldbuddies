'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { Briefcase, Home, Package, UserIcon, Wallet } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface UserDetailsProps {
  organizationId: string;
  userId: string;
}

export function UserDetails({ organizationId, userId }: UserDetailsProps) {
  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    {
      refetchInterval: 10000,
    }
  );

  const { data: game } = api.game.getGameByMember.useQuery(
    {
      memberId: userId,
      organizationId,
    },
    {
      refetchInterval: 10000,
    }
  );

  const member = members?.find((m) => m.id === userId);

  if (!member) {
    return <div>Gebruiker niet gevonden</div>;
  }

  // Process history data for charts
  const moneyHistory =
    game?.gameData?.history.events
      .filter((event) => event.type === 'transaction' && event.amount)
      .map((event) => ({
        month: `${event.timestamp.toString().slice(4, 6)}/${event.timestamp
          .toString()
          .slice(0, 4)}`,
        amount: event.amount ?? 0,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .reduce((acc, curr, index) => {
        const previousTotal = index > 0 ? acc[index - 1].total : 0;
        return [...acc, { ...curr, total: previousTotal + curr.amount }];
      }, [] as Array<{ month: string; amount: number; total: number }>) ?? [];

  const jobHistory =
    game?.gameData?.history.events
      .filter((event) => event.type === 'job')
      .map((event) => ({
        month: `${event.timestamp.toString().slice(4, 6)}/${event.timestamp
          .toString()
          .slice(0, 4)}`,
        job: event.description,
      }))
      .sort((a, b) => a.month.localeCompare(b.month)) ?? [];

  const assetHistory =
    game?.gameData?.history.events
      .filter((event) => event.type === 'asset')
      .map((event) => ({
        month: `${event.timestamp.toString().slice(4, 6)}/${event.timestamp
          .toString()
          .slice(0, 4)}`,
        type: event.amount && event.amount > 0 ? 'Aankoop' : 'Verkoop',
        asset: event.description,
      }))
      .sort((a, b) => a.month.localeCompare(b.month)) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 border border-muted/50">
          <UserIcon className="size-10 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{member.user.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Spel informatie</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Geld</p>
                  <p className="font-medium">
                    €{game?.gameData?.player.money.toLocaleString() ?? 0}
                  </p>
                </div>
              </div>

              {game?.gameData?.jobs.currentJob && (
                <div className="flex items-center gap-2">
                  <Briefcase className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Huidige baan</p>
                    <p className="font-medium">{game.gameData.jobs.currentJob.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {game.gameData.jobs.currentJob.company}
                    </p>
                  </div>
                </div>
              )}

              {game?.gameData?.assets?.owned && game.gameData.assets.owned.length > 0 && (
                <div className="flex items-center gap-2">
                  <Home className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Eigendommen</p>
                    <p className="font-medium">{game.gameData.assets.owned.length}</p>
                  </div>
                </div>
              )}

              {game?.gameData?.goods?.owned && game.gameData.goods.owned.length > 0 && (
                <div className="flex items-center gap-2">
                  <Package className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Spullen</p>
                    <p className="font-medium">{game.gameData.goods.owned.length}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Organisatie informatie</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="font-medium">Deelnemer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4">
        {/* Money History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Geld Geschiedenis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moneyHistory}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Job History */}
        <Card>
          <CardHeader>
            <CardTitle>Werk Geschiedenis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {jobHistory.map((job, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-muted/50 rounded-lg"
                >
                  <span className="font-medium">{job.job}</span>
                  <span className="text-sm text-muted-foreground">{job.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset History */}
        <Card>
          <CardHeader>
            <CardTitle>Eigendommen Geschiedenis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {assetHistory.map((asset, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-muted/50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{asset.asset}</span>
                    <span
                      className={`ml-2 text-sm ${
                        asset.type === 'Aankoop' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {asset.type}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{asset.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
