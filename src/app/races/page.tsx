import Link from "next/link";

import { db } from "~/server/db";
import { GoTo } from "~/components/GoTo";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <main>
      <h1>Races</h1>
      <GoTo href="/races/new">Register new race</GoTo>
    </main>
  );
};

export default PlayersPage;
