import { Main } from "~/components/Main";
import { getRaceParticipationsWithoutAHeat } from "~/server/data";
import { Thead, Tr } from "~/components/Table";
import type { RaceParticipation } from "~/app/models";

type RaceResult = {
  track: string;
  playerName: string;
  raceId: string;
  registeredDate: Date;
};

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
    {} as Record<string, RaceResult[]>,
  );

  const renderRows = () => {
    return Object.keys(groupedByRaceId).map((raceId) => {
      const raceParticipations = groupedByRaceId[raceId];
      return (
        <Tr key={raceId}>
          <td>{raceParticipations?.[0]?.track}</td>
          {raceParticipations?.map((rp) => (
            <>
              <td key={rp.playerName} className="text-right">
                {`${rp.playerName} (#${rp.finishingPosition})`}
              </td>
            </>
          ))}
          <td className="text-right">
            {raceParticipations?.[0]?.registeredDate.toLocaleString("nb-NO")}
          </td>
        </Tr>
      );
    });
  };

  return (
    <Main heading="Register new heat">
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
    </Main>
  );
};

export default RegisterHeatPage;
