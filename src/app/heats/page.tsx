import { Main } from "~/components/Main";
import { getAllHeatParticipations } from "~/server/data";
import { Thead, Tr } from "~/components/Table";
import { GoTo } from "~/components/GoTo";
import type { HeatParticipation } from "~/app/models";
import { prettifyPlayerName } from "~/app/lib/utils";

// TODO: Render heats in another way, table sucks

const RegisterHeatPage = async () => {
  const heatParticipationsResult = await getAllHeatParticipations();
  const groupedByHeatId = heatParticipationsResult.reduce(
    (acc: Record<string, HeatParticipation[]>, result) => {
      console.log("result", result);
      const { heatId } = result;
      if (!acc[heatId]) {
        acc[heatId] = [];
      }
      if (heatId) {
        acc[heatId]!.push(result);
      }
      return acc;
    },
    {} as Record<string, HeatParticipation[]>,
  );
  console.log("groupedByHeatId", groupedByHeatId);

  const renderRows = () => {
    return Object.keys(groupedByHeatId).map((heatId) => {
      const heatParticipationsByHeatId = groupedByHeatId[heatId];
      return (
        <Tr key={`race-${heatId}`}>
          {heatParticipationsByHeatId?.map((rp, index) => (
            <>
              <td
                key={`${heatId}-${rp.playerName}`}
                className={index === 0 ? "text-left" : "text-right"}
              >
                {`${prettifyPlayerName(rp.playerName, rp.playerHandle)} (#${rp.finishingPosition})`}
              </td>
            </>
          ))}
          <td className="text-right">
            {heatParticipationsByHeatId?.[0]?.heatDate.toLocaleString("nb-NO")}
          </td>
        </Tr>
      );
    });
  };

  return (
    <Main heading="Register new heat">
      <GoTo href="/heats/new" className="mb-4 self-start">
        Register new heat
      </GoTo>
      {heatParticipationsResult.length == 0 && <p>No heats registered yet</p>}
      {heatParticipationsResult.length > 0 && (
        <table className="w-full table-auto">
          <Thead
            thNames={["Player 1", "Player 2", "Player 3", "Player 4", "Date"]}
          />
          <tbody>{renderRows()}</tbody>
        </table>
      )}
    </Main>
  );
};

export default RegisterHeatPage;
