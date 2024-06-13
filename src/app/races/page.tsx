import { Heading } from "~/components/Heading";

import { db } from "~/server/db";
import { GoTo } from "~/components/GoTo";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <main>
      <Heading level={1}>Races</Heading>
      <GoTo href="/races/new">Register new race</GoTo>
    </main>
  );
};

export default PlayersPage;
