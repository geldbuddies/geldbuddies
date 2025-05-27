"use client";

/*  */ import { ScoreBreakdown } from "@/analysis/score-calculator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AnalysePage() {
  const [financialData, setFinancialData] = useState<ScoreBreakdown[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyse");
      if (!response.ok) {
        throw new Error("Failed to fetch financial data");
      }
      const data = await response.json();
      setFinancialData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching financial data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStyleForScore = (score: number) => {
    if (score >= 80) return "text-green-500 font-bold";
    if (score >= 50) return "text-yellow-500 font-medium";
    return "text-red-500 font-medium";
  };

  return (
    <div className="text-center p-5 font-sans">
      <h1 className="text-green-500 mb-2 text-2xl font-bold">
        Analyse Your Financials
      </h1>
      <p className="text-gray-600 mb-5">
        Use our scoring system to understand your financial health.
      </p>

      <Button
        className="bg-green-500 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-green-600 disabled:opacity-50"
        onClick={fetchFinancialData}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Analyse My Finances"}
      </Button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {financialData && financialData.length === 0 && (
        <div className="mt-4 p-6 bg-yellow-50 text-yellow-700 rounded border border-yellow-200">
          <h3 className="text-lg font-semibold mb-2">
            No Financial Data Available
          </h3>
          <p>
            It looks like you have not started your financial journey yet. Begin
            by playing a game to see your financial
            analysis.
          </p>
        </div>
      )}

      {financialData && financialData.length > 0 && (
        <div className="mt-5 p-3 bg-gray-100 text-left rounded shadow">
          {financialData.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-3 border rounded bg-white shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{item.domainType}</h2>
              <p>
                Final Score:{" "}
                <span className={getStyleForScore(item.finalScore)}>
                  {item.finalScore.toFixed(2)}%
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Progress Score: {item.details.progressScore.toFixed(2)} | Target
                Score: {item.details.targetScore.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Weighted Score: {item.details.weightedScore.toFixed(2)} | Domain
                Weight: {item.details.domainWeight.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Absolute Change: {item.metadata.absoluteChange.toFixed(2)} |
                Percentage Change: {item.metadata.percentageChange.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
