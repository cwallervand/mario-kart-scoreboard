import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { tracks } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env");

const trackNames = [
  "3DS_DK_JUNGLE",
  "3DS_MUSIC_PARK",
  "3DS_NEO_BOWSER_CITY",
  "3DS_PIRANHA_PLANT_SLIDE",
  "ANIMAL_CROSSING_CIRCUIT",
  "BIG_BLUE",
  "BONE_DRY_DUNES",
  "BOWSERS_CASTLE",
  "CLOUDTOP_CRUISE",
  "DOLPHIN_SHOALS",
  "DRAGON_DRIFTWAY",
  "DS_CHEEP_CHEEP_BEACH",
  "DS_TICK_TOCK_CLOCK",
  "DS_WARIO_STADIUM",
  "ELECTRODROME",
  "EXCITEBIKE_ARENA",
  "GBA_CHEESE_LAND",
  "GBA_MARIO_CIRCUIT",
  "GBA_RIBBON_ROAD",
  "GCN_BABY_PARK",
  "GCN_DRY_DRY_DESERT",
  "GCN_SHERBET_LAND",
  "GCN_YOSHIS_CIRCUIT",
  "HYRULE_CIRCUIT",
  "ICE_ICE_OUTPOST",
  "MARIO_CIRCUIT",
  "MARIO_KART_STADIUM",
  "MOUNT_WARIO",
  "MUTE_CITY",
  "N64_RAINBOW_ROAD",
  "N64_ROYAL_RACEWAY",
  "N64_TOADS_TURNPIKE",
  "N64_YOSHI_VALLEY",
  "RAINBOW_ROAD",
  "SHY_GUY_FALLS",
  "SNES_DONUT_PLAINS_3",
  "SNES_RAINBOW_ROAD",
  "SWEET_SWEET_CANYON",
  "SUNSHINE_AIRPORT",
  "SUPER_BELL_SUBWAY",
  "THWOMP_RUINS",
  "TOAD_HARBOR",
  "TWISTED_MANSION",
  "WATER_PARK",
  "WII_GRUMBLE_VOLCANO",
  "WII_MOO_MOO_MEADOWS",
  "WII_WARIOS_GOLD_MINE",
  "WILD_WOODS",
];
const main = async () => {
  const Pool = pg.Pool;
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);
  const tracksData: (typeof tracks.$inferInsert)[] = trackNames.map(
    (trackName) => ({
      name: trackName,
    }),
  );

  console.log("### Seed start ###");
  console.log("_Seeding tracks_");
  await db.insert(tracks).values(tracksData);
  console.log("_Seeding tracks done_");
  console.log("### Seed done ###");
};

await main();
