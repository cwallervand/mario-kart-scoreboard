import {
  getAllTimeLeaderboard,
  getPlayersWithMostFirstPlaces,
} from "~/server/data";
import { prettifyPlayerName } from "~/app/lib/utils";
import { Heading } from "~/components/Heading";
import { Thead, Tr } from "~/components/Table";
import { Main } from "~/components/Main";
import { NoData } from "~/components/NoData";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  const playersWithMostFirstPlaces = await getPlayersWithMostFirstPlaces();
  console.log("playersWithMostFirstPlaces", playersWithMostFirstPlaces);
  return (
    <Main heading="All the stats">
      <StatsSection>
        <Heading level={2}>All-time leaderboard</Heading>
        {leaderboard.length == 0 ? (
          <NoData />
        ) : (
          <Table>
            <Thead thNames={["Player", "Avg finishing position"]} />
            <tbody>
              {leaderboard.map((result) => (
                <Tr key={result.id}>
                  <td className="text-left">
                    {prettifyPlayerName(result.name, result.handle)}
                  </td>
                  <td className="text-right">
                    {result.avgFinishingPosition
                      ? Number.parseFloat(
                          result.avgFinishingPosition.toFixed(2),
                        )
                      : "-"}
                  </td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </StatsSection>
      <StatsSection>
        <Heading level={2}>Most first places</Heading>
        {playersWithMostFirstPlaces.length == 0 ? (
          <NoData />
        ) : (
          <Table>
            <Thead thNames={["Player", "1.st places"]} />
            <tbody>
              {playersWithMostFirstPlaces.map((result) => (
                <Tr key={`most-wins-${result.playerId}`}>
                  <td className="text-left">
                    {prettifyPlayerName(result.playerName, result.playerHandle)}
                  </td>
                  <td className="text-right">{result.firstPlaceCount}</td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </StatsSection>
    </Main>
  );
}

const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full max-w-xl table-auto">{children}</table>
);

const StatsSection = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-16 flex w-full flex-col items-center">{children}</div>
);
