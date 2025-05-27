'server-only';

import { headers } from 'next/headers';
import { auth } from './auth';

export const getServerSession = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });
  return session;
};
