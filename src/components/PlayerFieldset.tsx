import { FormSelect } from "~/components/FormSelect";
import { PlayerSelect } from "~/components/PlayerSelect";

import { finishingPositionsWithScore } from "~/app/lib/utils";
import type { Player } from "~/app/models";

interface PlayerFieldsetProps {
  players: Player[];
  playerNumber: string;
  selectedPlayer?: string;
}

export const PlayerFieldset = ({
  players,
  playerNumber,
  selectedPlayer,
}: PlayerFieldsetProps) => {
  const finishingPositions = Object.keys(finishingPositionsWithScore);

  const finishingPositionSelectOptions = finishingPositions.map((fp) => ({
    value: fp,
    label: fp,
  }));

  return (
    <fieldset className="mb-12 w-full">
      <legend className="text-lg">Player {playerNumber}</legend>
      <PlayerSelect
        players={players}
        name={`id-p${playerNumber}`}
        defaultValue={selectedPlayer}
        className="mb-3"
      />
      <FormSelect
        label="Finishing position"
        name={`finishing-position-p${playerNumber}`}
        options={finishingPositionSelectOptions}
        defaultValue={playerNumber}
      />
    </fieldset>
  );
};
