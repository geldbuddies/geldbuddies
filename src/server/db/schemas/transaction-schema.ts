import { pgTable, text, timestamp, numeric, integer, primaryKey, boolean } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const transaction = pgTable('transaction', {
  id: text('id').primaryKey(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  categoryId: text('category_id').references(() => category.id),
  createdById: text('created_by_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

export const category = pgTable('category', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const transactionParticipant = pgTable('transaction_participant', {
  transactionId: text('transaction_id')
    .notNull()
    .references(() => transaction.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  share: numeric('share', { precision: 10, scale: 2 }).notNull(),
  isPaid: boolean('is_paid').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.transactionId, table.userId] }),
  };
}); 