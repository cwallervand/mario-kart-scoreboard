import { Main } from "~/components/Main";

import { db } from "~/server/db";
import { GoTo } from "~/components/GoTo";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <Main heading="Races">
      <GoTo href="/races/new">Register new race</GoTo>
    </Main>
  );
};

export default PlayersPage;
