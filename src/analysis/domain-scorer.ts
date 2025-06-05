import { fetchDomainData } from "./fetch_data";
import { DomainScoreCalculator, ScoreBreakdown } from "./score-calculator";
import { GlobalScoreConfig } from "./config/global-score-config";

export async function calculateUserFinancialScores(userId: string): Promise<ScoreBreakdown[]> {
  try {
    const domains = await fetchDomainData(userId);
    
    const scores = domains.map(domain => 
      DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
    );
    
    return scores;
  } catch (error) {
    console.error("Error calculating financial scores:", error);
    throw new Error("Failed to calculate financial scores");
  }
}

// Calculate an overall financial health score (weighted average)
export function calculateOverallScore(scores: ScoreBreakdown[]): number {
  if (scores.length === 0) return 0;
  
  const totalWeight = scores.reduce((sum, score) => sum + score.details.domainWeight, 0);
  const weightedSum = scores.reduce(
    (sum, score) => sum + (score.finalScore * score.details.domainWeight), 
    0
  );
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}
