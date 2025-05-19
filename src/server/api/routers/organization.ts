import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { member, organization } from '@/server/db/schemas/auth-schema';
import { and, eq, gt } from 'drizzle-orm';
import { z } from 'zod';

export const organizationRouter = createTRPCRouter({
  getOrganizations: protectedProcedure.query(async ({ ctx }) => {
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
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const org = await ctx.db
        .select({
          id: organization.id,
          name: organization.name,
          createdAt: organization.createdAt,
          slug: organization.slug,
          logo: organization.logo,
          metadata: organization.metadata,
        })
        .from(organization)
        .innerJoin(member, eq(member.organizationId, organization.id))
        .where(and(eq(organization.id, input.id), eq(member.userId, ctx.session.user.id)))
        .limit(1);

      if (!org[0]) {
        throw new Error('Organization not found');
      }

      return org[0];
    }),

  getOrganizationByJoinCode: protectedProcedure
    .input(z.object({ joinCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const org = await ctx.db.query.organization.findFirst({
        where: and(
          eq(organization.joinCode, input.joinCode),
          gt(organization.joinCodeExpiresAt, new Date())
        ),
      });

      return org;
    }),
});
