import { db } from "@/server/db";
import * as schema from "@/server/db/schemas";
import { FinancialDomain, FinancialDomainType } from "./score-calculator";
import { eq } from "drizzle-orm";

export async function fetchDomainData(
  memberId: string
): Promise<FinancialDomain[]> {
  try {
    const [
      moneyData,
      // other data fetching functions can be added here
    ] = await Promise.all([
      fetchMoneyData(memberId),
      // other data fetching functions can be added here
    ]);

    return [
      moneyData,
      // other data fetching functions can be added here
    ].filter(Boolean) as FinancialDomain[];
  } catch (error) {
    console.error("Error fetching financial domain data:", error);
    throw new Error("Failed to fetch financial domain data");
  }
}

async function fetchMoneyData(
  playerId: string
): Promise<FinancialDomain | null> {
  try {
    const result = await db
      .select({
        money: schema.game.gameData,
      })
      .from(schema.game)
      .where(eq(schema.game.memberId, playerId.toString()));

    if (!result.length || !result[0].money?.player.money) return null;

    // For historical data, we'll use the current money value
    // and assume it was 90% of current value 30 days ago
    const currentMoney = result[0].money.player.money;
    const startMoney = currentMoney * 0.9;

    return {
      type: FinancialDomainType.MONEY,
      start: startMoney,
      end: currentMoney,
      weight: 1.0,
    };
  } catch (error) {
    console.error("Error fetching money data:", error);
    return null;
  }
}
