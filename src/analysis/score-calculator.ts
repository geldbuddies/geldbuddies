export enum FinancialDomainType {
  SAVINGS = "savings",
  INVESTMENTS = "investments",
  LOANS = "loans",
  DEBTS = "debts",
  MONEY = "money",
  OTHER = "other",
}

export interface FinancialDomain {
  type: FinancialDomainType;
  start: number;
  end: number;
  weight?: number;
}

export interface ScoreConfig {
  maxScore: number;
  minScore: number;
  progressWeight: number;
  targetWeight: number;
}

export interface ScoreBreakdown {
  domainType: FinancialDomainType;
  finalScore: number;
  details: {
    progressScore: number;
    targetScore: number;
    weightedScore: number;
    domainWeight: number;
  };
  metadata: {
    start: number;
    end: number;
    absoluteChange: number;
    percentageChange: number;
  };
}

export class DomainScoreCalculator {
  static calculateScore(
    domain: FinancialDomain,
    config: ScoreConfig
  ): ScoreBreakdown {
    const {
      maxScore = 100,
      minScore = 0,
      progressWeight = 0.6,
      targetWeight = 0.4,
    } = config;

    const progressScore = this.calculateProgressScore(domain.start, domain.end);
    const targetScore = this.calculateTargetScore(domain.end, domain.type);
    const weightedScore =
      progressScore * progressWeight + targetScore * targetWeight;
    const domainWeight = domain.weight ?? 1;
    const finalScore = Math.min(
      Math.max(weightedScore * domainWeight, minScore),
      maxScore
    );

    return {
      domainType: domain.type,
      finalScore,
      details: {
        progressScore,
        targetScore,
        weightedScore,
        domainWeight,
      },
      metadata: {
        start: domain.start,
        end: domain.end,
        absoluteChange: domain.end - domain.start,
        percentageChange:
          domain.start !== 0
            ? ((domain.end - domain.start) / Math.abs(domain.start)) * 100
            : domain.end > 0
            ? 100
            : 0,
      },
    };
  }

  private static calculateProgressScore(start: number, end: number): number {
    if (start === 0) return end > 0 ? 100 : 0;
    const progress = ((end - start) / Math.abs(start)) * 100;
    return Math.max(0, Math.min(100, progress));
  }

  private static calculateTargetScore(
    end: number,
    type: FinancialDomainType
  ): number {
    switch (type) {
      case FinancialDomainType.LOANS:
      case FinancialDomainType.DEBTS:
        return end <= 0 ? 100 : Math.max(0, 100 - end / 100);
      default:
        return end >= 0 ? 100 : 0;
    }
  }
}
