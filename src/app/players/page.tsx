import { currentUser } from "@clerk/nextjs/server";
import "next/link";

import { GoTo } from "~/components/GoTo";
import { Thead, Tr } from "~/components/Table";
import { prettifyPlayerName } from "~/app/lib/utils";
import { getAllPlayers } from "~/server/data";
import { Main } from "~/components/Main";

const PlayersPage = async () => {
  const players = await getAllPlayers();
  const cu = await currentUser();
  const userCanRegisterPlayers = !!cu?.privateMetadata.canRegisterPlayers;

  return (
    <Main heading="Players">
      {userCanRegisterPlayers && (
        <GoTo href="/players/new" className="mb-4 self-start">
          Register new player
        </GoTo>
      )}

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
    </Main>
  );
};

export default PlayersPage;
