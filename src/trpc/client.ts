// src/features/editor/services/trpc-vanilla-client.ts
import type { AppRouter } from '@/server/api/root';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';

// Function to get base URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// Create a vanilla tRPC client (not dependent on React hooks)
export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: SuperJSON,
      url: getBaseUrl() + '/api/trpc',
    }),
  ],
});
