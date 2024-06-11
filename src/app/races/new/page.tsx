import { createRace } from "~/server/serverActions";
import { FormSelect } from "~/components/FormSelect";
import { TracksSelect } from "~/components/TracksSelect";
import { PlayerSelect } from "~/components/PlayerSelect";
import { finishingPositionsWithScore } from "~/app/lib/utils";

const RegisterRacePage = async () => {
  const finishingPositions = Object.keys(finishingPositionsWithScore);

  const finishingPositionSelectOptions = finishingPositions.map((fp) => ({
    value: fp,
    label: fp,
  }));

  return (
    <main>
      <h1>Register new race</h1>
      <form action={createRace}>
        <TracksSelect />
        <br />
        <fieldset>
          <legend>Player 1</legend>
          <PlayerSelect name="id-p1" />
          <FormSelect
            label="Finishing position"
            name="finishing-position-p1"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <br />
        <fieldset>
          <legend>Player 2</legend>
          <PlayerSelect name="id-p2" />
          <FormSelect
            label="Finishing position"
            name="finishing-position-p2"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <br />
        <fieldset>
          <legend>Player 3</legend>
          <PlayerSelect name="id-p3" />
          <FormSelect
            label="Finishing position"
            name="finishing-position-p3"
            options={finishingPositionSelectOptions}
          />
        </fieldset>
        <br />
        <fieldset>
          <legend>Player 4</legend>
          <PlayerSelect name="id-p4" />
          <FormSelect
            label="Finishing position"
            name="finishing-position-p4"
            options={finishingPositionSelectOptions}
          />
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default RegisterRacePage;
