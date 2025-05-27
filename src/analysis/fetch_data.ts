import { db } from "@/server/db";
import * as schema from "@/server/db/schemas";
import { FinancialDomain, FinancialDomainType } from "./score-calculator";
import { eq } from "drizzle-orm";

export async function fetchDomainData(
  playerId: number
): Promise<FinancialDomain[]> {
  try {
    const [
      moneyData,
      savingsData,
      investmentsData,
      debtsData,
      loansData,
      otherData,
    ] = await Promise.all([
      fetchMoneyData(playerId),
      fetchSavingsData(playerId),
      fetchInvestmentsData(playerId),
      fetchDebtsData(playerId),
      fetchLoansData(playerId),
      fetchOtherData(playerId),
    ]);

    return [
      moneyData,
      savingsData,
      investmentsData,
      debtsData,
      loansData,
      otherData,
    ].filter(Boolean) as FinancialDomain[];
  } catch (error) {
    console.error("Error fetching financial domain data:", error);
    throw new Error("Failed to fetch financial domain data");
  }
}

async function fetchMoneyData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const transactions = await db
      .select()
      .from(schema.transactions)
      .where(eq(schema.transactions.playerId, playerId))
      .orderBy(schema.transactions.gameStatusTimestamp);

    if (transactions.length === 0) return null;

    const startTransactions = transactions.filter(
      (t) =>
        t.gameStatusTimestamp &&
        new Date(t.gameStatusTimestamp).getTime() <
          Date.now() - 30 * 24 * 60 * 60 * 1000
    );
    const startBalance = startTransactions.reduce(
      (total, t) => total + Number(t.amount),
      0
    );

    const endBalance = transactions.reduce(
      (total, t) => total + Number(t.amount),
      0
    );

    return {
      type: FinancialDomainType.MONEY,
      start: startBalance,
      end: endBalance,
      weight: 1.0,
    };
  } catch (error) {
    console.error("Error fetching money data:", error);
    return null;
  }
}

async function fetchSavingsData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const assets = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.playerId, playerId));

    const savingsAssets = assets.filter((asset) =>
      asset.name?.toLowerCase().includes("saving")
    );

    if (savingsAssets.length === 0) return null;

    const currentSavings = savingsAssets.reduce(
      (total, asset) => total + Number(asset.value),
      0
    );

    const startSavings = currentSavings * 0.9;

    return {
      type: FinancialDomainType.SAVINGS,
      start: startSavings,
      end: currentSavings,
      weight: 1.2,
    };
  } catch (error) {
    console.error("Error fetching savings data:", error);
    return null;
  }
}

async function fetchInvestmentsData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const investments = await db
      .select()
      .from(schema.investments)
      .where(eq(schema.investments.playerId, playerId))
      .orderBy(schema.investments.gameStatusTimestamp);

    if (investments.length === 0) return null;

    const earliestInvestments = investments.filter(
      (inv) =>
        inv.gameStatusTimestamp &&
        new Date(inv.gameStatusTimestamp).getTime() <
          Date.now() - 30 * 24 * 60 * 60 * 1000
    );

    const startValue =
      earliestInvestments.length > 0
        ? earliestInvestments.reduce(
            (total, inv) => total + Number(inv.amount),
            0
          )
        : investments[0]
        ? Number(investments[0].amount) * 0.9
        : 0;

    const endValue = investments.reduce(
      (total, inv) => total + Number(inv.amount),
      0
    );

    return {
      type: FinancialDomainType.INVESTMENTS,
      start: startValue,
      end: endValue,
      weight: 1.3,
    };
  } catch (error) {
    console.error("Error fetching investments data:", error);
    return null;
  }
}

async function fetchDebtsData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const [unexpectedExpenses, subscriptions] = await Promise.all([
      db
        .select()
        .from(schema.unexpectedExpenses)
        .where(eq(schema.unexpectedExpenses.playerId, playerId)),
      db
        .select()
        .from(schema.subscriptions)
        .where(eq(schema.subscriptions.playerId, playerId)),
    ]);

    const expensesDebt = unexpectedExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );

    const subscriptionsDebt = subscriptions
      .filter((sub) => sub.isActive)
      .reduce((total, sub) => total + Number(sub.monthlyCost) * 12, 0);

    const totalDebt = expensesDebt + subscriptionsDebt;

    if (totalDebt === 0) return null;

    const startDebt = totalDebt * 1.05;

    return {
      type: FinancialDomainType.DEBTS,
      start: startDebt,
      end: totalDebt,
      weight: 1.1,
    };
  } catch (error) {
    console.error("Error fetching debts data:", error);
    return null;
  }
}

async function fetchLoansData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const loans = await db
      .select()
      .from(schema.loans)
      .where(eq(schema.loans.playerId, playerId))
      .orderBy(schema.loans.gameStatusTimestamp);

    if (loans.length === 0) return null;

    const earliestLoans = loans.filter(
      (loan) =>
        loan.gameStatusTimestamp &&
        new Date(loan.gameStatusTimestamp).getTime() <
          Date.now() - 30 * 24 * 60 * 60 * 1000
    );

    const startValue =
      earliestLoans.length > 0
        ? earliestLoans.reduce((total, loan) => total + Number(loan.amount), 0)
        : loans[0]
        ? Number(loans[0].amount) * 1.05
        : 0;

    const endValue = loans.reduce(
      (total, loan) => total + Number(loan.amount),
      0
    );

    return {
      type: FinancialDomainType.LOANS,
      start: startValue,
      end: endValue,
      weight: 1.1,
    };
  } catch (error) {
    console.error("Error fetching loans data:", error);
    return null;
  }
}

async function fetchOtherData(
  playerId: number
): Promise<FinancialDomain | null> {
  try {
    const insurance = await db
      .select()
      .from(schema.insurance)
      .where(eq(schema.insurance.playerId, playerId));

    const inflationData = await db
      .select()
      .from(schema.inflation)
      .orderBy(schema.inflation.year);

    if (insurance.length === 0 && inflationData.length === 0) return null;

    const insuranceCost = insurance.reduce(
      (total, ins) => total + Number(ins.monthlyPremium) * 12,
      0
    );

    const end = insuranceCost > 0 ? 100 - insuranceCost / 100 : 100;
    const start = end * 0.95;

    return {
      type: FinancialDomainType.OTHER,
      start: start,
      end: end,
      weight: 0.7,
    };
  } catch (error) {
    console.error("Error fetching other financial data:", error);
    return null;
  }
}
