"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/server/db";
import { players, races, raceParticipations } from "~/server/db/schema";
import { getRaceScore } from "~/app/lib/utils";

const CreatePlayerFormSchema = z.object({
  name: z.string(),
  handle: z.optional(z.string()),
});

const CreateRaceFormSchema = z.object({
  track: z.string(),
  "id-p1": z.coerce.number(),
  "finishing-position-p1": z.coerce.number(),
  "id-p2": z.coerce.number(),
  "finishing-position-p2": z.coerce.number(),
  "id-p3": z.coerce.number(),
  "finishing-position-p3": z.coerce.number(),
  "id-p4": z.coerce.number(),
  "finishing-position-p4": z.coerce.number(),
});

export const createRace = async (formData: FormData) => {
  console.log("--- createRace ---");
  console.log("formData", formData);

  const validatedFields = CreateRaceFormSchema.parse(
    Object.fromEntries(formData.entries()),
  );
  console.log("validatedFields", validatedFields);

  const raceData = {
    track: validatedFields.track,
  };

  try {
    const createdRace = await db
      .insert(races)
      .values(raceData)
      .returning({ createdRaceId: races.id });

    const createdRaceId = createdRace[0]?.createdRaceId;

    if (!createdRaceId) {
      throw new Error("Could not create race");
    } else {
      const raceParticipationsData = [
        {
          raceId: createdRaceId,
          playerId: validatedFields["id-p1"],
          finishingPosition: validatedFields["finishing-position-p1"],
          score: getRaceScore(validatedFields["finishing-position-p1"]),
        },
        {
          raceId: createdRaceId,
          playerId: validatedFields["id-p2"],
          finishingPosition: validatedFields["finishing-position-p2"],
          score: getRaceScore(validatedFields["finishing-position-p2"]),
        },
        {
          raceId: createdRaceId,
          playerId: validatedFields["id-p3"],
          finishingPosition: validatedFields["finishing-position-p3"],
          score: getRaceScore(validatedFields["finishing-position-p3"]),
        },
        {
          raceId: createdRaceId,
          playerId: validatedFields["id-p4"],
          finishingPosition: validatedFields["finishing-position-p4"],
          score: getRaceScore(validatedFields["finishing-position-p4"]),
        },
      ];

      console.log("raceParticipationsData", raceParticipationsData);
      // TODO: If this fails, delete teh created race
      await db.insert(raceParticipations).values(raceParticipationsData);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const createPlayer = async (formData: FormData) => {
  const validatedFields = CreatePlayerFormSchema.parse(
    Object.fromEntries(formData.entries()),
  );
  try {
    await db.insert(players).values(validatedFields);
  } catch (error) {
    console.log("error", error);
    // return {
    //   message: "Could not create player",
    // };
    throw new Error("Could not create player");
  }

  revalidatePath("/players");
  redirect("/players");
};
