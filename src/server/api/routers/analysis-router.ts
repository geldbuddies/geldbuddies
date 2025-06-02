import { createTRPCRouter, protectedProcedure } from "../trpc";
import { fetchDomainData } from "@/analysis/fetch_data";
import { DomainScoreCalculator } from "@/analysis/score-calculator";
import { GlobalScoreConfig } from "@/analysis/config/global-score-config";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { member } from "@/server/db/schemas/auth-schema";

export type AnalysisResponse = {
  status: "NO_CLASSROOM" | "NO_GAME_DATA" | "HAS_DATA";
  message: string;
  data?: ReturnType<typeof DomainScoreCalculator.calculateScore>[];
};

export const analysisRouter = createTRPCRouter({
  getAnalysis: protectedProcedure.query(
    async ({ ctx }): Promise<AnalysisResponse> => {
      const { session } = ctx;

      // Check if user is in any classroom
      const userMemberships = await db.query.member.findFirst({
        where: eq(member.userId, session.user.id),
      });

      if (!userMemberships) {
        return {
          status: "NO_CLASSROOM",
          message:
            "Je bent nog niet toegevoegd aan een klas. Join eerst een klas om je analyse te kunnen bekijken.",
        };
      }

      // If they are in a classroom, get their game data
      const domainData = await fetchDomainData(userMemberships.id);

      if (domainData.length === 0) {
        return {
          status: "NO_GAME_DATA",
          message:
            "Je hebt nog geen spel gespeeld in deze klas. Speel eerst een spel om je analyse te kunnen bekijken.",
        };
      }

      // Calculate and return scores if we have data
      const scores = domainData.map((domain) =>
        DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
      );

      return {
        status: "HAS_DATA",
        message: "Analyse beschikbaar",
        data: scores,
      };
    }
  ),
});