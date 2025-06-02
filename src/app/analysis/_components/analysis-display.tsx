'use client';

import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import type { ScoreBreakdown } from "@/analysis/score-calculator";
import Link from "next/link";

export function AnalysisDisplay() {
  const { data: analysis, isLoading } = api.analysis.getAnalysis.useQuery(
    undefined,
    {
      retry: false,
    }
  );

  const getStyleForScore = (score: number) => {
    if (score >= 80) return "text-green-500 font-bold";
    if (score >= 50) return "text-yellow-500 font-medium";
    return "text-red-500 font-medium";
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  // Show message if no data or no classroom
  if (!analysis || analysis.status !== "HAS_DATA") {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {analysis?.message ?? "Geen Financiële Data Beschikbaar"}
          </h3>
        </div>
      </Card>
    );
  }

  return (
    <div className="text-center p-5 font-sans">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Terug naar Home
          </Button>
        </Link>
      </div>

      <h1 className="text-green-500 mb-2 text-2xl font-bold">
        Jouw Financiële Analyse
      </h1>
      <p className="text-gray-600 mb-5">
        Bekijk hier je financiële scores en voortgang.
      </p>

      <div className="mt-5 p-3 bg-gray-100 text-left rounded shadow">
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
    </div>
  );
}