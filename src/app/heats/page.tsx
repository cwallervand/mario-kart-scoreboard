import { currentUser } from "@clerk/nextjs/server";

import { Main } from "~/components/Main";
import { getAllHeatParticipations } from "~/server/data";
import { GoTo } from "~/components/GoTo";
import type { HeatParticipation } from "~/app/models";
import { prettifyPlayerName } from "~/app/lib/utils";

const RegisterHeatPage = async () => {
  const heatParticipationsResult = await getAllHeatParticipations();
  const groupedByHeatId = heatParticipationsResult.reduce(
    (acc: Record<string, HeatParticipation[]>, result) => {
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

  const renderListItems = () => {
    return Object.keys(groupedByHeatId).map((heatId) => {
      const heatParticipationsByHeatId = groupedByHeatId[heatId];

      if (
        heatParticipationsByHeatId === undefined ||
        heatParticipationsByHeatId.length === 0 ||
        heatParticipationsByHeatId === null
      ) {
        return null;
      }

      return (
        <li key={heatId} className="w-36">
          <div className="rounded-md bg-[#E52521]/65 p-2 text-center font-bold text-white">
            {heatParticipationsByHeatId?.[0]?.heatDate.toLocaleDateString(
              "nb-NO",
            ) ?? ""}
          </div>
          <div className="p-2">
            {heatParticipationsByHeatId?.map((hp) => {
              return (
                <div key={`${heatId}-${hp.playerId}`} className="mb-1 flex">
                  <b className="mr-2">{hp.finishingPosition}.</b>
                  <span className="overflow-auto">{`${prettifyPlayerName(hp.playerName, hp.playerHandle)}`}</span>
                </div>
              );
            })}
          </div>
        </li>
      );
    });
  };

  const cu = await currentUser();
  const userCanRegisterPlayers = !!cu?.privateMetadata.canRegisterPlayers;

  return (
    <Main heading="Register new heat">
      {userCanRegisterPlayers && (
        <GoTo href="/heats/new" className="mb-4 self-start">
          Register new heat
        </GoTo>
      )}

      {heatParticipationsResult.length == 0 && <p>No heats registered yet</p>}
      {heatParticipationsResult.length > 0 && (
        <ul className="flex w-full flex-row flex-wrap justify-evenly gap-6">
          {renderListItems()}
        </ul>
      )}
    </Main>
  );
};

export default RegisterHeatPage;
