import { getAllTimeLeaderboard } from "~/server/data";
import { prettifyPlayerName } from "~/app/lib/utils";
import { Heading } from "~/components/Heading";
import { Thead, Tr } from "~/components/Table";
import { Main } from "~/components/Main";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  return (
    <Main heading="All the stats">
      <Heading level={2}>All-time leaderboard</Heading>
      <table className="w-full table-auto">
        <Thead
          thNames={["Player", "Avg finishing position", "Avg race score"]}
        />
        <tbody>
          {leaderboard.map((result) => (
            <Tr key={result.id}>
              <td className="text-left">
                {prettifyPlayerName(result.name, result.handle)}
              </td>
              <td className="text-right">
                {result.avgFinishingPosition
                  ? Number.parseFloat(result.avgFinishingPosition.toFixed(2))
                  : "-"}
              </td>
              <td className="text-right">
                {result.avgScore
                  ? Number.parseFloat(result.avgScore.toFixed(2))
                  : "-"}
              </td>
            </Tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
}
