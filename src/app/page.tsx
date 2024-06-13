import { getAllTimeLeaderboard } from "~/server/data";
import { prettifyPlayerName } from "./lib/utils";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  return (
    <main className="flex w-full flex-col items-center">
      <h1>All-time leaderboard</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Player</th>
            <th className="text-right">Avg finishing position</th>
            <th className="text-right">Avg race score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result) => (
            <tr key={result.id}>
              <td className="text-left">
                {prettifyPlayerName(result.name, result.handle)}
              </td>
              <td className="text-right">{result.avgFinishingPosition}</td>
              <td className="text-right">{result.avgScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
