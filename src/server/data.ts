"use server";
import { db } from "~/server/db";

import { sql, eq, asc } from "drizzle-orm";
import {
  players as playersSchema,
  heatParticipations as heatParticipationsSchema,
} from "~/server/db/schema";
import type { HeatParticipation, Player } from "~/app/models";

export const getAllHeatParticipations = async (): Promise<
  HeatParticipation[]
> => {
  try {
    const queryResult = await db
      .select({
        playerName: sql`${playersSchema.name}`.mapWith(String),
        playerHandle: playersSchema.handle,
        playerId: sql`${heatParticipationsSchema.playerId}`.mapWith(String),
        finishingPosition:
          sql`${heatParticipationsSchema.finishingPosition}`.mapWith(Number),
        score: sql`${heatParticipationsSchema.score}`.mapWith(Number),
        heatId: sql`${heatParticipationsSchema.heatId}`.mapWith(String),
        heatDate: heatParticipationsSchema.heatDate,
      })
      .from(heatParticipationsSchema)
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, heatParticipationsSchema.playerId),
      )
      .groupBy(
        sql`${heatParticipationsSchema.id},${playersSchema.name},${playersSchema.handle}`,
      )
      .orderBy(sql`${heatParticipationsSchema.finishingPosition} asc`);

    const heatParticipations = queryResult.map((result) => ({
      heatId: result.heatId,
      playerName: result.playerName,
      playerHandle: result.playerHandle,
      playerId: result.playerId,
      finishingPosition: result.finishingPosition,
      score: result.score,
      heatDate: result.heatDate,
    })) as HeatParticipation[];
    return heatParticipations;
  } catch (error) {
    throw new Error("Failed to get heat participations");
  }
};

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const result = await db.query.players.findMany({
      orderBy: [asc(playersSchema.name)],
    });
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
        handle: playersSchema.handle,
        playerId: sql`${heatParticipationsSchema.playerId}`.mapWith(String),
        avgFinishingPosition:
          sql`avg(${heatParticipationsSchema.finishingPosition})`
            .mapWith(Number)
            .as("avgFinishingPosition"),
      })
      .from(heatParticipationsSchema)
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, heatParticipationsSchema.playerId),
      )

      .groupBy(sql`${heatParticipationsSchema.playerId},${playersSchema.id}`)
      .orderBy(sql`AVG(${heatParticipationsSchema.finishingPosition}) asc`);
    console.log("queryResult", queryResult);

    const leaderboard = queryResult.map(
      (row) =>
        ({
          id: row.playerId,
          name: row.name,
          handle: row.handle ?? undefined,
          avgFinishingPosition: row.avgFinishingPosition,
        }) as Player,
    );

    return leaderboard;
  } catch (error) {
    throw new Error("Failed to get leaderboard");
  }
};

export const getPlayersWithMostFirstPlaces = async (
  resultLimit = 3,
): Promise<
  {
    playerId: string;
    playerName: string;
    playerHandle?: string;
    firstPlaceCount: number;
  }[]
> => {
  console.log("### getPlayersWithMostFirstPlaces ###");
  try {
    const queryResult = await db
      .select({
        playerId: sql`${playersSchema.id}`.mapWith(String),
        playerName: sql`${playersSchema.name}`.mapWith(String),
        playerHandle: playersSchema.handle,
        firstPlaceCount:
          sql`COUNT(${heatParticipationsSchema.finishingPosition}) as firstPlaceCount`.mapWith(
            Number,
          ),
      })
      .from(playersSchema)
      .leftJoin(
        heatParticipationsSchema,
        eq(playersSchema.id, heatParticipationsSchema.playerId),
      )
      .where(eq(heatParticipationsSchema.finishingPosition, 1))
      .groupBy(
        sql`${playersSchema.id},${playersSchema.name},${playersSchema.handle}`,
      )
      .orderBy(sql`firstPlaceCount desc`)
      .limit(resultLimit);

    const result = queryResult.map((result) => ({
      playerName: result.playerName,
      playerHandle: result.playerHandle,
      firstPlaceCount: result.firstPlaceCount,
    })) as {
      playerId: string;
      playerName: string;
      playerHandle?: string;
      firstPlaceCount: number;
    }[];
    return result;
  } catch (error) {
    throw new Error("Failed to get players with most first places");
  }
};
