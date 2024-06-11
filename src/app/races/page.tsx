import Link from "next/link";

import { db } from "~/server/db";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <main>
      <h1>Races</h1>
      <Link href="/races/new">Register new race</Link>
    </main>
  );
};

export default PlayersPage;
