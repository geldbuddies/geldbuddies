// API Route for fetching financial data from DB

import { NextResponse } from "next/server";
import { fetchDomainData } from "@/analysis/fetch_data";
import { GlobalScoreConfig } from "../../../analysis/config/global-score-config";
import { DomainScoreCalculator } from "../../../analysis/score-calculator";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const userId = 1; // Hardcoded for now

    const domainData = await fetchDomainData(userId);

    if (domainData.length === 0) {
      return NextResponse.json([]);
    }

    const scores = domainData.map((domain) =>
      DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
    );

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
