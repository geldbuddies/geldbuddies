import { generateJoinCode } from '@/lib/classroom';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { member, organization, user } from '@/server/db/schemas/auth-schema';
import { and, eq, gt } from 'drizzle-orm';
import { z } from 'zod';

export const organizationRouter = createTRPCRouter({
  getOrganizations: protectedProcedure
    .input(
      z
        .object({
          refreshJoinCode: z.boolean().optional(),
        })
        .optional()
    )
    .query(async ({ ctx }) => {
      const organizations = await ctx.db
        .select({
          id: organization.id,
          name: organization.name,
          createdAt: organization.createdAt,
        })
        .from(organization)
        .innerJoin(member, eq(member.organizationId, organization.id))
        .where(eq(member.userId, ctx.session.user.id));

      return organizations;
    }),

  getOrganization: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        refreshJoinCode: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, refreshJoinCode = false } = input;

      // First get the organization
      const org = await ctx.db
        .select({
          id: organization.id,
          name: organization.name,
          createdAt: organization.createdAt,
          slug: organization.slug,
          logo: organization.logo,
          metadata: organization.metadata,
          joinCode: organization.joinCode,
          joinCodeExpiresAt: organization.joinCodeExpiresAt,
          gameState: organization.gameState,
        })
        .from(organization)
        .innerJoin(member, eq(member.organizationId, organization.id))
        .where(and(eq(organization.id, id), eq(member.userId, ctx.session.user.id)))
        .limit(1)
        .then((results) => results[0]);

      if (!org) {
        throw new Error('Organization not found');
      }

      // Handle join code logic
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      if (refreshJoinCode) {
        // If code exists and is not expired, just renew expiry
        if (org.joinCode && org.joinCodeExpiresAt && org.joinCodeExpiresAt > now) {
          await ctx.db
            .update(organization)
            .set({ joinCodeExpiresAt: oneHourFromNow })
            .where(eq(organization.id, id));
          return { ...org, joinCodeExpiresAt: oneHourFromNow };
        }

        // If code doesn't exist or is expired, generate new code
        let newCode = generateJoinCode();
        let isUnique = false;

        // Keep trying until we get a unique code
        while (!isUnique) {
          const existingOrg = await ctx.db.query.organization.findFirst({
            where: eq(organization.joinCode, newCode),
          });
          if (!existingOrg) {
            isUnique = true;
          } else {
            newCode = generateJoinCode();
          }
        }

        await ctx.db
          .update(organization)
          .set({
            joinCode: newCode,
            joinCodeExpiresAt: oneHourFromNow,
          })
          .where(eq(organization.id, id));

        return { ...org, joinCode: newCode, joinCodeExpiresAt: oneHourFromNow };
      } else {
        // If not refreshing, check if code is expired and set to null if it is
        if (org.joinCode && org.joinCodeExpiresAt && org.joinCodeExpiresAt <= now) {
          await ctx.db
            .update(organization)
            .set({ joinCode: null, joinCodeExpiresAt: null })
            .where(eq(organization.id, id));
          return { ...org, joinCode: null, joinCodeExpiresAt: null };
        }
      }

      return org;
    }),

  getPublicOrganization: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const org = await ctx.db.query.organization.findFirst({
        where: eq(organization.id, id),
        columns: {
          id: true,
          name: true,
          joinCode: true,
          joinCodeExpiresAt: true,
          gameState: true,
          createdAt: true,
        },
      });

      if (!org) {
        throw new Error('Organization not found');
      }

      return org;
    }),

  getOrganizationByJoinCode: publicProcedure
    .input(z.object({ joinCode: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log('input', input);
      const org = await ctx.db.query.organization.findFirst({
        where: and(
          eq(organization.joinCode, input.joinCode),
          gt(organization.joinCodeExpiresAt, new Date())
        ),
      });

      return org;
    }),

  getMemberByUserId: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { organizationId, userId } = input;

      const memberRecord = await ctx.db.query.member.findFirst({
        where: and(eq(member.organizationId, organizationId), eq(member.userId, userId)),
      });

      return memberRecord;
    }),

  getOrganizationMembers: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { organizationId } = input;

      const members = await ctx.db
        .select({
          id: member.id,
          user: {
            name: user.name,
          },
        })
        .from(member)
        .innerJoin(user, eq(member.userId, user.id))
        .where(and(eq(member.organizationId, organizationId), eq(member.role, 'member')))
        .orderBy(member.createdAt);

      return members;
    }),

  updateGameState: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        gameState: z.enum(['not_started', 'in_progress', 'paused', 'completed']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, gameState } = input;

      // Verify user has permission to update game state
      const memberRecord = await ctx.db.query.member.findFirst({
        where: and(
          eq(member.organizationId, organizationId),
          eq(member.userId, ctx.session.user.id),
          eq(member.role, 'owner')
        ),
      });

      if (!memberRecord) {
        throw new Error('Unauthorized to update game state');
      }

      // Update game state
      await ctx.db
        .update(organization)
        .set({ gameState })
        .where(eq(organization.id, organizationId));

      return { success: true };
    }),
});
