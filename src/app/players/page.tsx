import "next/link";
import { GoTo } from "~/components/GoTo";
import { Heading } from "~/components/Heading";
import { Thead, Tr } from "~/components/Table";
import { prettifyPlayerName } from "~/app/lib/utils";
import { getAllPlayers } from "~/server/data";

const PlayersPage = async () => {
  const players = await getAllPlayers();
  console.log(players);
  return (
    <main className="flex w-full flex-col items-center">
      <Heading level={1}>Players</Heading>
      <GoTo href="/players/new" className="mb-4 self-start">
        Register new player
      </GoTo>
      <table className="w-full table-auto">
        <Thead thNames={["Name"]} />
        <tbody>
          {players.map((player) => (
            <Tr key={player.id}>
              <td>{prettifyPlayerName(player.name, player.handle)}</td>
            </Tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default PlayersPage;
