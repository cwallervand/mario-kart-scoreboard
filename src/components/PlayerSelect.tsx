import { db } from "~/server/db";
import { FormSelect } from "~/components/FormSelect";

interface PlayerSelectProps {
  name: string;
}

export const PlayerSelect = async ({ name }: PlayerSelectProps) => {
  const players = await db.query.players.findMany();

  const playerSelectOptions = players.map((player) => ({
    value: player.id.toString(),
    label: `${player.name}${player.handle ? ` (${player.handle})` : ""}`,
  }));

  return (
    <FormSelect label="Player" name={name} options={playerSelectOptions} />
  );
};
