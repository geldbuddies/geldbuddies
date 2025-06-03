'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { api } from '@/trpc/react';
import type { ScoreBreakdown } from '@/analysis/score-calculator';

interface UserAnalysisProps {
  organizationId: string;
  userId: string;
}

export function UserAnalysis({ organizationId, userId }: UserAnalysisProps) {
  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    { refetchInterval: 10000 }
  );

  const member = members?.find((m) => m.userId === userId);
  
  if (!member) {
    return <div>Gebruiker niet gevonden</div>;
  }

  console.log("MemberID:", member.id);

  const { data: analysis, isLoading } = api.analysis.getAnalysis.useQuery(
    { memberId: member.id, organizationId },
    { retry: false }
  );

  const getStyleForScore = (score: number) => {
    if (score >= 80) return "text-green-500 font-bold";
    if (score >= 50) return "text-yellow-500 font-medium";
    return "text-red-500 font-medium";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-[30vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!analysis || analysis.status !== "HAS_DATA") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">
              {analysis?.message ?? "Geen Financiële Data Beschikbaar"}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Financiële Analyse van {member.user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-5 text-center">
          Bekijk hier de financiële scores en voortgang van deze gebruiker.
        </p>
        <div className="mt-5 space-y-4">
          {analysis.data?.map((item: ScoreBreakdown, index: number) => (
            <div key={index} className="mb-4 p-3 border rounded bg-white shadow">
              <h2 className="text-lg font-semibold mb-2">
                {item.domainType}
              </h2>
              <p>
                Eindscore:{" "}
                <span className={getStyleForScore(item.finalScore)}>
                  {item.finalScore.toFixed(2)}%
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Voortgang Score: {item.details.progressScore.toFixed(2)} | 
                Doel Score: {item.details.targetScore.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Gewogen Score: {item.details.weightedScore.toFixed(2)} | 
                Domein Gewicht: {item.details.domainWeight.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Absolute Verandering: {item.metadata.absoluteChange.toFixed(2)} | 
                Percentage Verandering: {item.metadata.percentageChange.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
