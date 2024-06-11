import { db } from "~/server/db";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <main>
      <h1>Races</h1>
    </main>
  );
};

export default PlayersPage;
