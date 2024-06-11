import { db } from "~/server/db";
import Link from "next/link";

const PlayersPage = async () => {
  const players = await db.query.players.findMany();
  console.log(players);
  return (
    <main>
      <h1>Players</h1>
      <Link href="/players/new">Register new player</Link>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.handle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default PlayersPage;
