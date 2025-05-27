// app/actions/create-game.ts
'use server';

import { db } from '@/server/db'; // jouw Drizzle instantie
import { game } from '@/server/db/schemas/game-schema'; // jouw game-tabel
import { getServerSession } from '@/server/auth/utils';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';

export async function createGameIfNotExists({
  memberId,
  organizationId,
}: {
  memberId: string;
  organizationId: string;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // Check of game al bestaat
  const existing = await db
    .select()
    .from(game)
    .where(
      eq(game.memberId, memberId)
    );

  if (existing.length > 0) {
    return existing[0]; // Game bestaat al
  }

  const now = new Date();

  const newGame = {
    id: uuid(),
    memberId,
    organizationId,
    gameData: null, // of beginstatus als JSON
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(game).values(newGame);

  return newGame;
}
