import { GlobalScoreConfig } from '@/analysis/config/global-score-config';
import { fetchDomainData } from '@/analysis/fetch_data';
import { DomainScoreCalculator } from '@/analysis/score-calculator';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export type AnalysisResponse = {
  status: 'NO_CLASSROOM' | 'NO_GAME_DATA' | 'HAS_DATA';
  message: string;
  data?: ReturnType<typeof DomainScoreCalculator.calculateScore>[];
};

export const analysisRouter = createTRPCRouter({
  getAnalysis: protectedProcedure
    .input(z.object({ memberId: z.string(), organizationId: z.string() }))
    .query(async ({ input }): Promise<AnalysisResponse> => {
      const { memberId } = input;

      // Fetch domain data for the requested member
      const domainData = await fetchDomainData(memberId);

      if (!domainData) {
        return {
          status: 'NO_CLASSROOM',
          message: 'Deze gebruiker is niet verbonden aan een klas.',
        };
      }

      if (domainData.length === 0) {
        return {
          status: 'NO_GAME_DATA',
          message: 'Deze gebruiker heeft nog geen spel gespeeld in deze klas.',
        };
      }

      // Calculate and return scores if we have data
      const scores = domainData.map((domain) =>
        DomainScoreCalculator.calculateScore(domain, GlobalScoreConfig)
      );

      return {
        status: 'HAS_DATA',
        message: 'Analyse beschikbaar',
        data: scores,
      };
    }),
});
