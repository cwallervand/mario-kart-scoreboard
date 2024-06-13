import { getAllTimeLeaderboard } from "~/server/data";
import { prettifyPlayerName } from "./lib/utils";
import { Heading } from "~/components/Heading";

export default async function ScoreboardPage() {
  const leaderboard = await getAllTimeLeaderboard();
  return (
    <main className="flex w-full flex-col items-center">
      <Heading level={1}>All the stats</Heading>
      <Heading level={2}>All-time leaderboard</Heading>
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
  <th className={`underline-wavy decoration-1 ${className}`}>{children}</th>
);
