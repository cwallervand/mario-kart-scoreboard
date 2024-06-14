import { getAllTimeLeaderboard } from "~/server/data";
import { prettifyPlayerName } from "~/app/lib/utils";
import { Heading } from "~/components/Heading";
import { Thead, Tr } from "~/components/Table";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  return (
    <main className="flex w-full flex-col items-center">
      <Heading level={1}>All the stats</Heading>
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
              <td className="text-right">{result.avgFinishingPosition}</td>
              <td className="text-right">{result.avgScore}</td>
            </Tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
