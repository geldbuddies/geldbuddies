import { createTRPCRouter, protectedProcedure } from "../trpc";
import { fetchDomainData } from "@/analysis/fetch_data";
import { DomainScoreCalculator } from "@/analysis/score-calculator";
import { GlobalScoreConfig } from "@/analysis/config/global-score-config";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

export type AnalysisResponse = {
  status: "NO_CLASSROOM" | "NO_GAME_DATA" | "HAS_DATA";
  message: string;
  data?: ReturnType<typeof DomainScoreCalculator.calculateScore>[];
};

export const analysisRouter = createTRPCRouter({
  getAnalysis: protectedProcedure
    .input(z.object({ memberId: z.string(), organizationId: z.string() }))
    .query(
      async ({ input, ctx }): Promise<AnalysisResponse> => {
        const { memberId, organizationId } = input;

        // Check if the requested member is in the organization/classroom
        const userMemberships = await db.query.member.findFirst({
          where: (m) =>
            eq(m.userId, memberId) &&
            eq(m.organizationId, organizationId),
        });

        if (!userMemberships) {
          return {
            status: "NO_CLASSROOM",
            message:
              "Deze gebruiker is niet toegevoegd aan deze klas.",
          };
        }

        // Fetch domain data for the requested member
        const domainData = await fetchDomainData(userMemberships.id);

        console.log("Fetched domain data:", domainData);

        if (domainData.length === 0) {
          return {
            status: "NO_GAME_DATA",
            message:
              "Deze gebruiker heeft nog geen spel gespeeld in deze klas.",
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