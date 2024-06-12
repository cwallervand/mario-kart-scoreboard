import Link from "next/link";

import { createRace } from "~/server/serverActions";
import { FormSelect } from "~/components/FormSelect";
import { TracksSelect } from "~/components/TracksSelect";
import { PlayerSelect } from "~/components/PlayerSelect";
import { finishingPositionsWithScore } from "~/app/lib/utils";
import { db } from "~/server/db";
import { SubmitButton } from "~/components/SubmitButton";
import { GoTo } from "~/components/GoTo";

const RegisterRacePage = async () => {
  const players = await db.query.players.findMany();

  return (
    <main className="flex w-full flex-col">
      {players.length == 0 ? (
        <NoPlayers />
      ) : (
        <>
          <h1>Register new race</h1>
          <form action={createRace}>
            <TracksSelect className="mb-6" />
            <PlayerFieldset playerNumber="1" />
            <PlayerFieldset playerNumber="2" />
            <PlayerFieldset playerNumber="3" />
            <PlayerFieldset playerNumber="4" />

            <SubmitButton />
          </form>
        </>
      )}
    </main>
  );
};

export default RegisterRacePage;

const PlayerFieldset = ({ playerNumber }: { playerNumber: string }) => {
  const finishingPositions = Object.keys(finishingPositionsWithScore);

  const finishingPositionSelectOptions = finishingPositions.map((fp) => ({
    value: fp,
    label: fp,
  }));

  return (
    <fieldset className="mb-12">
      <legend className="text-lg">Player {playerNumber}</legend>
      <PlayerSelect name={`id-p${playerNumber}`} className="mb-3" />
      <FormSelect
        label="Finishing position"
        name={`finishing-position-p${playerNumber}`}
        options={finishingPositionSelectOptions}
      />
    </fieldset>
  );
};

const NoPlayers = () => (
  <div>
    <p>Woops, no players are registered.</p>
    <p>
      <GoTo href="/players/new">Create a new player</GoTo>
    </p>
  </div>
);
