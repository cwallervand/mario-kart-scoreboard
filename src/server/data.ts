"use server";
import { db } from "~/server/db";

import { sql, eq, isNull } from "drizzle-orm";
import {
  players as playersSchema,
  raceParticipations as raceParticipationsSchema,
  races,
} from "~/server/db/schema";
import type { Player, RaceParticipation, Track } from "~/app/models";

export const getRaceParticipationsWithoutAHeat = async (): Promise<
  RaceParticipation[]
> => {
  console.log("### getRaceParticipationsWithoutAHeat ###");
  try {
    const queryResult = await db
      .select({
        finishingPosition:
          sql`${raceParticipationsSchema.finishingPosition}`.mapWith(Number),
        playerName: sql`${playersSchema.name}`.mapWith(String),
        raceId: sql`${races.id}`.mapWith(String),
        track: sql`${races.track}`.mapWith(String),
        registeredDate: races.date,
      })
      .from(raceParticipationsSchema)
      .where(isNull(races.heatId))
      .fullJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipationsSchema.playerId),
      )
      .fullJoin(races, eq(races.id, raceParticipationsSchema.raceId))
      .groupBy(
        sql`${raceParticipationsSchema.finishingPosition},${playersSchema.name},${races.id}`,
      );

    const raceParticipations = queryResult.map(
      (result) =>
        ({
          track: result.track,
          playerName: result.playerName,
          finishingPosition: result.finishingPosition,
          registeredDate: result.registeredDate,
          raceId: result.raceId,
        }) as RaceParticipation,
    );

    return raceParticipations;
  } catch (error) {
    throw new Error("Failed to get race participations");
  }
};

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

export const getAllTracks = async (): Promise<Track[]> => {
  try {
    const result = await db.query.tracks.findMany();
    const tracks = result.map((track) => ({
      name: track.name,
    }));
    return tracks;
  } catch (error) {
    throw new Error("Failed to get tracks");
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
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipations.playerId),
      )

      .groupBy(sql`${raceParticipations.playerId},${playersSchema.id}`)
      .orderBy(
        sql`AVG(${raceParticipations.score}) desc, AVG(${raceParticipations.finishingPosition}) asc`,
      );
    console.log("queryResult", queryResult);

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
