import { Main } from "~/components/Main";
import { getRaceParticipationsWithoutAHeat } from "~/server/data";
import { Thead, Tr } from "~/components/Table";
import type { RaceParticipation } from "~/app/models";
import { registerRacesToHeat } from "~/server/serverActions";
import { prettifyPlayerName, prettifyTrackName } from "~/app/lib/utils";
import { SubmitButton } from "~/components/SubmitButton";

const RegisterHeatPage = async () => {
  const raceParticipations = await getRaceParticipationsWithoutAHeat();
  const groupedByRaceId = raceParticipations.reduce(
    (acc: Record<string, RaceParticipation[]>, result) => {
      const { raceId } = result;
      if (!acc[raceId]) {
        acc[raceId] = [];
      }
      if (raceId) {
        acc[raceId]!.push(result);
      }
      return acc;
    },
    {} as Record<string, RaceParticipation[]>,
  );
  const renderRows = () => {
    return Object.keys(groupedByRaceId).map((raceId) => {
      console.log("raceId", raceId);
      const raceParticipations = groupedByRaceId[raceId];
      return (
        <Tr key={`race-${raceId}`}>
          <td className="text-left">
            {prettifyTrackName(raceParticipations?.[0]?.track ?? "")}
          </td>
          {raceParticipations?.map((rp) => (
            <>
              <td key={`${raceId}-${rp.playerName}`} className="text-right">
                {`${prettifyPlayerName(rp.playerName, rp.playerHandle)} (#${rp.finishingPosition})`}
              </td>
            </>
          ))}
          <td className="text-right">
            {raceParticipations?.[0]?.registeredDate.toLocaleString("nb-NO")}
          </td>
          <td className="text-right">
            <input
              type="checkbox"
              id={`checkbox-${raceId}`}
              value={raceId}
              name="raceIds"
            />
          </td>
        </Tr>
      );
    });
  };

  return (
    <Main heading="Register new heat">
      {raceParticipations.length == 0 && (
        <p>All races are registered in a heat</p>
      )}
      {raceParticipations.length > 0 && (
        <form className="w-full" action={registerRacesToHeat}>
          <table className="w-full table-auto">
            <Thead
              thNames={[
                "Track",
                "Player 1",
                "Player 2",
                "Player 3",
                "Player 4",
                "Date",
              ]}
            />
            <tbody>{renderRows()}</tbody>
          </table>
          <SubmitButton />
        </form>
      )}
    </Main>
  );
};

export default RegisterHeatPage;
