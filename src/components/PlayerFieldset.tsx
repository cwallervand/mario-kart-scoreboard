import { PlayerSelect } from "~/components/PlayerSelect";
import { FormInput } from "~/components/FormInput";

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
  return (
    <fieldset className="mb-6 w-full">
      <legend className="text-lg">Player {playerNumber}</legend>
      <PlayerSelect
        players={players}
        name={`id-p${playerNumber}`}
        defaultValue={selectedPlayer}
        className="mb-3"
      />
      <FormInput
        name={`finishing-position-p${playerNumber}`}
        label="Finishing position"
        className="mb-6"
        type="number"
      />
    </fieldset>
  );
};
