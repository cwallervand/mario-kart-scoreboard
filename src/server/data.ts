"use server";
import { db } from "~/server/db";

import { sql, eq, isNull, asc } from "drizzle-orm";
import {
  players as playersSchema,
  raceParticipations as raceParticipationsSchema,
  races,
} from "~/server/db/schema";
import type { Player, RaceParticipation, Track } from "~/app/models";

export const getRaceParticipationsWithoutAHeat = async (): Promise<
  RaceParticipation[]
> => {
  try {
    const queryResult = await db
      .select({
        playerName: sql`${playersSchema.name}`.mapWith(String),
        playerHandle: playersSchema.handle,
        finishingPosition:
          sql`${raceParticipationsSchema.finishingPosition}`.mapWith(Number),

        raceId: sql`${races.id}`.mapWith(String),
        track: sql`${races.track}`.mapWith(String),
        registeredDate: races.date,
      })
      .from(raceParticipationsSchema)
      .where(isNull(races.heatId))
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipationsSchema.playerId),
      )
      .leftJoin(races, eq(races.id, raceParticipationsSchema.raceId))
      .groupBy(
        sql`${raceParticipationsSchema.finishingPosition},${playersSchema.name},${playersSchema.handle},${races.id}`,
      );

    const raceParticipations = queryResult.map(
      (result) =>
        ({
          track: result.track,
          playerName: result.playerName,
          playerHandle: result.playerHandle,
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

// SELECT DISTINCT
//   "mario-kart-scoreboard_players"."name",
//   "mario-kart-scoreboard_players"."handle",
//   SUM(
//     "mario-kart-scoreboard_race_participations"."score"
//   )
// FROM
//   "mario-kart-scoreboard_race_participations"
//   LEFT JOIN "mario-kart-scoreboard_players" ON "mario-kart-scoreboard_players"."id" = "mario-kart-scoreboard_race_participations"."playerId"
//   LEFT JOIN "mario-kart-scoreboard_races" ON "mario-kart-scoreboard_races"."id" = "mario-kart-scoreboard_race_participations"."raceId"
// GROUP BY
//   "mario-kart-scoreboard_players"."id",
//   "mario-kart-scoreboard_race_participations"."score",
//   "mario-kart-scoreboard_races"."heatId"
// HAVING
//   SUM("mario-kart-scoreboard_race_participations"."score") = 60;

export const getPlayersWithPerfectHeat = async (): Promise<Player[]> => {
  try {
    const queryResult = await db
      .selectDistinct({
        name: sql`${playersSchema.name}`.mapWith(String),
        handle: playersSchema.handle,
      })
      .from(raceParticipationsSchema)
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipationsSchema.playerId),
      )
      .leftJoin(races, eq(races.id, raceParticipationsSchema.raceId))

      .groupBy(
        sql`${playersSchema.id},${raceParticipationsSchema.score},${races.heatId}`,
      )
      .having(sql`sum(${raceParticipationsSchema.score}) = 60`);
    console.log("queryResult", queryResult);
    return [];
  } catch (error) {
    throw new Error("Failed to get players with perfect heat");
  }
};

export const getAllTimeLeaderboard = async (): Promise<Player[]> => {
  try {
    const queryResult = await db
      .select({
        name: sql`${playersSchema.name}`.mapWith(String),
        handle: playersSchema.handle,
        playerId: sql`${raceParticipationsSchema.playerId}`.mapWith(String),
        avgScore: sql`avg(${raceParticipationsSchema.score})`.mapWith(Number),
        avgFinishingPosition:
          sql`avg(${raceParticipationsSchema.finishingPosition})`
            .mapWith(Number)
            .as("avgFinishingPosition"),
      })
      .from(raceParticipationsSchema)
      .leftJoin(
        playersSchema,
        eq(playersSchema.id, raceParticipationsSchema.playerId),
      )

      .groupBy(sql`${raceParticipationsSchema.playerId},${playersSchema.id}`)
      .orderBy(
        sql`AVG(${raceParticipationsSchema.score}) desc, AVG(${raceParticipationsSchema.finishingPosition}) asc`,
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
