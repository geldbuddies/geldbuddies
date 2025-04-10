'use client'

import { scoringResults } from "@/analysis/example/johndoe";
import { ScoreBreakdown } from "@/analysis/score-calculator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AnalysePage() {
    const [financialData, setFinancialData] = useState<ScoreBreakdown[]>();

    const getStyleForScore = (score: number) => {
        if (score >= 80) return "text-green-500 font-bold";
        if (score >= 50) return "text-yellow-500 font-medium";
        return "text-red-500 font-medium";
    };

    return (
        <div className="text-center p-5 font-sans">
            <h1 className="text-green-500 mb-2 text-2xl font-bold">Analyse Your Financials</h1>
            <p className="text-gray-600 mb-5">Use our scoring system to understand your financial health.</p>
            <Button 
                className="bg-green-500 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-green-600" 
                onClick={() => { setFinancialData(scoringResults() as ScoreBreakdown[]) }}
            >
                Get
            </Button>
            {financialData && (
                <div className="mt-5 p-3 bg-gray-100 text-left rounded shadow">
                    {financialData.map((item, index) => (
                        <div key={index} className="mb-4 p-3 border rounded bg-white shadow">
                            <h2 className="text-lg font-semibold mb-2">
                                {item.domainType}
                            </h2>
                            <p>
                                Final Score:{" "}
                                <span className={getStyleForScore(item.finalScore)}>
                                    {item.finalScore}%
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Progress Score: {item.details.progressScore} | Target Score: {item.details.targetScore}
                            </p>
                            <p className="text-sm text-gray-600">
                                Weighted Score: {item.details.weightedScore} | Domain Weight: {item.details.domainWeight}
                            </p>
                            <p className="text-sm text-gray-600">
                                Absolute Change: {item.metadata.absoluteChange} | Percentage Change: {item.metadata.percentageChange}%
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}