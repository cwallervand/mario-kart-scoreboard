import { FormSelect } from "~/components/FormSelect";
import { prettifyPlayerName } from "~/app/lib/utils";
import type { Player } from "~/app/models";

interface PlayerSelectProps {
  players: Player[];
  name: string;
  hasEmptyDefaultOption?: boolean;
  defaultValue?: string;
  className?: string;
}

export const PlayerSelect = ({
  players,
  name,
  hasEmptyDefaultOption = true,
  defaultValue,
  className,
}: PlayerSelectProps) => {
  const playerSelectOptions = players.map((player) => ({
    value: player.id.toString(),
    label: prettifyPlayerName(player.name, player.handle ?? undefined),
  }));

  return (
    <FormSelect
      label="Player"
      name={name}
      options={playerSelectOptions}
      hasEmptyDefaultOption={hasEmptyDefaultOption}
      defaultValue={defaultValue}
      className={className}
    />
  );
};
