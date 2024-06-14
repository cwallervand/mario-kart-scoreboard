"use server";
import { db } from "~/server/db";

import { sql, eq } from "drizzle-orm";
import {
  players as playersSchema,
  raceParticipations,
} from "~/server/db/schema";
import type { Player } from "~/app/models";

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const result = await db.query.players.findMany();
    const players = result.map((player) => ({
      id: player.id.toString(),
      name: player.name,
      handle: player.handle ?? undefined,
    }));
    return players;
  } catch (error) {
    throw new Error("Failed to get players");
  }
};

export const getAllTimeLeaderboard = async (): Promise<Player[]> => {
  try {
    const queryResult = await db
      .select({
        name: sql`${playersSchema.name}`.mapWith(String),
        playerId: sql`${raceParticipations.playerId}`.mapWith(String),
        avgScore: sql`avg(${raceParticipations.score})`.mapWith(Number),
        avgFinishingPosition: sql`avg(${raceParticipations.finishingPosition})`
          .mapWith(Number)
          .as("avgFinishingPosition"),
        handle: playersSchema.handle,
      })
      .from(raceParticipations)
      .fullJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipations.playerId),
      )

      .groupBy(sql`${raceParticipations.playerId},${playersSchema.id}`)
      .orderBy(
        sql`AVG(${raceParticipations.score}) desc, AVG(${raceParticipations.finishingPosition}) asc`,
      );

    const leaderboard = queryResult.map(
      (row) =>
        ({
          id: row.playerId,
          name: row.name,
          handle: row.handle ?? undefined,
          avgScore: row.avgScore,
          avgFinishingPosition: row.avgFinishingPosition,
        }) as Player,
    );

    return leaderboard;
  } catch (error) {
    throw new Error("Failed to get leaderboard");
  }
};
