"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { db } from "~/server/db";
import { players, heatParticipations } from "~/server/db/schema";

const CreatePlayerFormSchema = z.object({
  name: z.string(),
  handle: z.optional(z.string()),
});

const CreateHeatFormSchema = z.object({
  "id-p1": z.coerce.number(),
  "finishing-position-p1": z.coerce.number(),
  "id-p2": z.coerce.number(),
  "finishing-position-p2": z.coerce.number(),
  "id-p3": z.coerce.number(),
  "finishing-position-p3": z.coerce.number(),
  "id-p4": z.coerce.number(),
  "finishing-position-p4": z.coerce.number(),
});

export const createHeat = async (formData: FormData) => {
  console.log("___ createHeat ___", formData);
  const validatedFields = CreateHeatFormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  try {
    const heatId: string = uuidv4();
    const heatDate = new Date();
    const heatParticipationsData = [
      {
        playerId: validatedFields["id-p1"],
        finishingPosition: validatedFields["finishing-position-p1"],
        heatId,
        heatDate,
      },
      {
        playerId: validatedFields["id-p2"],
        finishingPosition: validatedFields["finishing-position-p2"],
        heatId,
        heatDate,
      },
      {
        playerId: validatedFields["id-p3"],
        finishingPosition: validatedFields["finishing-position-p3"],
        heatId,
        heatDate,
      },
      {
        playerId: validatedFields["id-p4"],
        finishingPosition: validatedFields["finishing-position-p4"],
        heatId,
        heatDate,
      },
    ];

    console.log("heat", heatParticipationsData);
    await db.insert(heatParticipations).values(heatParticipationsData);
  } catch (error) {
    console.log("error", error);
    return {
      message: "Could not create heat",
    };
  }
  revalidatePath("/heats");
  redirect("/heats");
};

export const createPlayer = async (formData: FormData) => {
  const validatedFields = CreatePlayerFormSchema.parse(
    Object.fromEntries(formData.entries()),
  );
  try {
    await db.insert(players).values(validatedFields);
  } catch (error) {
    console.log("error", error);
    throw new Error("Could not create player");
  }

  revalidatePath("/players");
  redirect("/players");
};
