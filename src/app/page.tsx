import { getAllTimeLeaderboard } from "~/server/data";
import { prettifyPlayerName } from "./lib/utils";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  return (
    <main className="flex w-full flex-col items-center">
      <h1>All-time leaderboard</h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-stroke text-stroke-width-1 h-12 align-top font-mario md:text-xl">
            <TableHead className="text-left">Player</TableHead>
            <TableHead className="text-right">Avg finishing position</TableHead>
            <TableHead className="text-right">Avg race score</TableHead>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result) => (
            <tr key={result.id} className="h-9">
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

const TableHead = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <th
    className={`underline decoration-wavy decoration-1 underline-offset-4 ${className}`}
  >
    {children}
  </th>
);
