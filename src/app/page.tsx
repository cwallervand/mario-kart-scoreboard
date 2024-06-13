import { getAllTimeLeaderboard } from "~/server/data";
export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  console.log("leaderboard", leaderboard);
  return (
    <main>
      <h1>Leaderboard</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Handle</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result) => (
            <tr key={result.playerName}>
              <td>{result.playerName}</td>
              <td>{result.avgScore}</td>
              <td>{result.avgFinishingPosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
