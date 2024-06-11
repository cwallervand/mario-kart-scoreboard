import { db } from "~/server/db";
import { createRace } from "~/server/serverActions";

const RegisterRacePage = async () => {
  console.log("RegisterRacePage");
  const players = await db.query.players.findMany();
  const tracks = await db.query.tracks.findMany();
  console.log("tracks", tracks);
  console.log("players", players);

  const finishingPositionsWithScore = {
    1: 15,
    2: 12,
    3: 10,
    4: 9,
    5: 8,
    6: 7,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1,
  };

  const finishingPositions = Object.keys(finishingPositionsWithScore);

  const trackSelectOptions = tracks.map((track) => ({
    value: track.name,
    label: track.name,
  }));

  const playerSelectOptions = players.map((player) => ({
    value: player.id.toString(),
    label: `${player.name}${player.handle ? ` (${player.handle})` : ""}`,
  }));

  const finishingPositionSelectOptions = finishingPositions.map((fp) => ({
    value: fp,
    label: fp,
  }));

  return (
    <main>
      <h1>Register new race</h1>
      <form action={createRace}>
        <Select label="Track" elementId="track" options={trackSelectOptions} />
        <fieldset>
          <legend>Player 1</legend>
          <Select
            label="Player"
            elementId="player-p1"
            options={playerSelectOptions}
          />
          <Select
            label="Finishing position"
            elementId="finishing-position-p1"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <fieldset>
          <legend>Player 2</legend>
          <Select
            label="Player"
            elementId="player-p2"
            options={playerSelectOptions}
          />
          <Select
            label="Finishing position"
            elementId="finishing-position-p2"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <fieldset>
          <legend>Player 3</legend>
          <Select
            label="Player"
            elementId="player-p3"
            options={playerSelectOptions}
          />
          <Select
            label="Finishing position"
            elementId="finishing-position-p3"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <fieldset>
          <legend>Player 4</legend>
          <Select
            label="Player"
            elementId="player-p4"
            options={playerSelectOptions}
          />
          <Select
            label="Finishing position"
            elementId="finishing-position-p4"
            options={finishingPositionSelectOptions}
          />
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

interface SelectProps {
  label: string;
  elementId: string;
  options: Array<{ value: string; label: string }>;
}

const Select = ({ label, elementId, options }: SelectProps) => {
  return (
    <div>
      <label htmlFor={elementId}>{label}</label>
      <select name={elementId}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegisterRacePage;
