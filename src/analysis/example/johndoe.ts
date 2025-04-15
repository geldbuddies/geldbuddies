import {
  DomainScoreCalculator,
  FinancialDomain,
  FinancialDomainType,
} from "../score-calculator";
import { GlobalScoreConfig } from "../config/global-score-config";
import mockData from "../data/mock-data.json";

const financials = mockData.financials;

const domains: FinancialDomain[] = [
  {
    type: FinancialDomainType.SAVINGS,
    start: financials.start.savings,
    end: financials.end.savings,
  },
  {
    type: FinancialDomainType.INVESTMENTS,
    start: financials.start.investments,
    end: financials.end.investments,
  },
  {
    type: FinancialDomainType.LOANS,
    start: financials.start.loans,
    end: financials.end.loans,
  },
  {
    type: FinancialDomainType.DEBTS,
    start: financials.start.debts,
    end: financials.end.debts,
  },
  {
    type: FinancialDomainType.MONEY,
    start: financials.start.money,
    end: financials.end.money,
  },
];

export const scoringResults = () => {
  const result = domains.map((domain) =>
    DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
  );
  return result
}
