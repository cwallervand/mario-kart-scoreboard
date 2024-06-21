import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { tracks } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!("POSTGRES_URL" in process.env))
  throw new Error("POSTGRES_URL not found on .env");

const raceTracks = [
  "AMSTERDAM_DRIFT",
  "ANIMAL_CROSSING",
  "ATHENS_DASH",
  "BABY_PARK_GCN",
  "BANGKOK_RUSH",
  "BERLIN_BYWAYS",
  "BIG_BLUE",
  "BONE-DRY_DUNES",
  "BOO_LAKE_GBA",
  "BOWSER_CASTLE_3_SNES",
  "BOWSERS_CASTLE",
  "CHEEP_CHEEP_BEACH_DS",
  "CHEESE_LAND_GBA",
  "CHOCO_MOUNTAIN_N64",
  "CLOUDTOP_CRUISE",
  "COCONUT_MALL_WII",
  "DAISY_CIRCUIT_WII",
  "DAISY_CRUISER_GCN",
  "DK_JUNGLE_3DS",
  "DK_MOUNTAIN_GCN",
  "DK_SUMMIT_WII",
  "DOLPHIN_SHOALS",
  "DONUT_PLAINS_3_SNES",
  "DRAGON_DRIFTWAY",
  "DRY_DRY_DESERT_GCN",
  "ELECTRODROME",
  "EXCITEBIKE_ARENA",
  "GRUMBLE_VOLCANO_WII",
  "HYRULE_CIRCUIT",
  "ICE_ICE_OUTPOST",
  "KALIMARI_DESERT_N64",
  "KOOPA_CAPE_WII",
  "LONDON_LOOP",
  "LOS_ANGELES_LAPS",
  "MADRID_DRIVE",
  "MAPLE_TREEWAY_WII",
  "MARIO_CIRCUIT",
  "MARIO_CIRCUIT_3_SNES",
  "MARIO_CIRCUIT_DS",
  "MARIO_CIRCUIT_GBA",
  "MARIO_KART_STADIUM",
  "MERRY_MOUNTAIN",
  "MOO_MOO_MEADOWS_WII",
  "MOONVIEW_HIGHWAY_WII",
  "MOUNT_WARIO",
  "MUSIC_PARK_3DS",
  "MUSHROOM_GORGE_WII",
  "MUTE_CITY",
  "NEO_BOWSER_CITY_3DS",
  "NEW_YORK_MINUTE",
  "NINJA_HIDEAWAY",
  "PARIS_PROMENADE",
  "PEACH_GARDENS_DS",
  "PIRANHA_PLANT_COVE",
  "PIRANHA_PLANT_SLIDE_3DS",
  "RAINBOW_ROAD",
  "RAINBOW_ROAD_3DS",
  "RAINBOW_ROAD_N64",
  "RAINBOW_ROAD_SNES",
  "RAINBOW_ROAD_WII",
  "RIBBON_ROAD_GBA",
  "RIVERSIDE_PARK_GBA",
  "ROCK_ROCK_MOUNTAIN_3DS",
  "ROME_AVANTI",
  "ROSALINAS_ICE_WORLD_3DS",
  "ROYAL_RACEWAY_N64",
  "SHERBET_LAND_GCN",
  "SHROOM_RIDGE_DS",
  "SHY_GUY_FALLS",
  "SIDNEY_SPRINT",
  "SINGAPORE_SPEEDWAY",
  "SKY-HIGH_SUNDAE",
  "SKY_GARDEN_GBA",
  "SNOW_LAND_GBA",
  "SQUEAKY_CLEAN_SPRINT",
  "SUNSET_AIRPORT",
  "SUNSET_WILDS_GBA",
  "SUPER_BELL_SUBWAY",
  "SWEET_SWEET_CANYON",
  "TICK-TOCK_CLOCK_DS",
  "TOAD_CIRCUIT_3DS",
  "TOAD_HARBOR",
  "TOADS_TURNPIKE_N64",
  "TOKIO_BLUR",
  "TWISTED_MANSION",
  "TWOMP_RUINS",
  "VANCOUVER_VELOCITY",
  "WALUIGI_PINBALL_DS",
  "WALUIGI_STADIUM_GCN",
  "WARIOS_GOLD_MINE_WII",
  "WARIO_STADIUM_DS",
  "WATER_PARK",
  "WILD_WOODS",
  "YOSHI_CIRCUIT_GCN",
  "YOSHI_VALLEY_N64",
  "YOSHIS_ISLAND",
];
const main = async () => {
  const Pool = pg.Pool;
  const client = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  const db = drizzle(client);
  const tracksData: (typeof tracks.$inferInsert)[] = raceTracks.map(
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
