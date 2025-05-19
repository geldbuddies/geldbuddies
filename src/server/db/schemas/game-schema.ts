import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { member, organization } from './auth-schema';

export const game = pgTable('game', {
  id: text('id').primaryKey(),
  memberId: text('member_id')
    .notNull()
    .references(() => member.id, { onDelete: 'cascade' }),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
