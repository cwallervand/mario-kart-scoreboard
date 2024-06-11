"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/server/db";
import { players, races } from "~/server/db/schema";

const PlayerSchema = z.object({
  id: z.string(),
});

const CreatePlayerFormSchema = z.object({
  name: z.string(),
  handle: z.optional(z.string()),
});

// const CreateRaceFormSchema = z.object({
//   track: z.string(),
//   players: z.array(PlayerSchema).max(4),
// });

const CreateRaceFormSchema = z.object({
  track: z.string(),
  "player-p1": z.string(),
  "finishing-position-p1": z.string(),
  "player-p2": z.string(),
  "finishing-position-p2": z.string(),
  "player-p3": z.string(),
  "finishing-position-p3": z.string(),
  "player-p4": z.string(),
  "finishing-position-p4": z.string(),
});

export const createRace = async (formData: FormData) => {
  console.log("createRace", formData);

  const validatedFields = CreateRaceFormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  console.log("validatedFields", validatedFields);
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
