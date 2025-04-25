import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { createTRPCRouter } from "@/server/api/trpc";
import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";


export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    passwordRegexError:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  },
});

//placeholder procedures for trpc connection for account page 
export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async () => {
      return { success: true };
    }),

  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async () => {
      return { success: true };
    }),
});
