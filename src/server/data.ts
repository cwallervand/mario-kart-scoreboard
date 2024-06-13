import { db } from "~/server/db";

import { sql, eq, asc, desc } from "drizzle-orm";
// import { unstable_noStore as noStore } from "next/cache";
import {
  players as playersSchema,
  raceParticipations,
} from "~/server/db/schema";
import type { Player } from "~/app/models";
// SELECT
//   "mario-kart-scoreboard_race_participations"."playerId",
//   AVG(
//     "mario-kart-scoreboard_race_participations"."score"
//   ) AS "avgScore",
//   AVG(
//     "mario-kart-scoreboard_race_participations"."finishingPosition"
//   ) AS "avgFinishingPosition",
//   "mario-kart-scoreboard_players"."name"
// FROM
//   "mario-kart-scoreboard_race_participations"
// FULL JOIN "mario-kart-scoreboard_players" ON "mario-kart-scoreboard_players"."id" = "mario-kart-scoreboard_race_participations"."playerId"
// GROUP BY
//   "mario-kart-scoreboard_race_participations"."playerId",
//   "mario-kart-scoreboard_players"."name";

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

    const players = queryResult.map(
      (row) =>
        ({
          id: row.playerId,
          name: row.name,
          handle: row.handle ?? undefined,
          avgScore: row.avgScore,
          avgFinishingPosition: row.avgFinishingPosition,
        }) as Player,
    );

    return players;
  } catch (error) {
    throw new Error("Failed to get leaderboard");
  }
};
