import { createHeat } from "~/server/serverActions";
import { SubmitButton } from "~/components/SubmitButton";
import { PlayerFieldset } from "~/components/PlayerFieldset";
import { Main } from "~/components/Main";
import { getAllPlayers } from "~/server/data";

interface RegisterRacePageProps {
  searchParams: {
    selectedPlayers?: string;
  };
}

const RegisterRacePage = async ({ searchParams }: RegisterRacePageProps) => {
  const allPlayers = await getAllPlayers();
  const preselectedPlayerIds = searchParams.selectedPlayers?.split(",");

  const playerNumbers = ["1", "2", "3", "4"];

  return (
    <Main heading="Register new race">
      <form action={createHeat} className="flex w-full flex-col items-start">
        {playerNumbers.map((playerNumber) => (
          <PlayerFieldset
            players={allPlayers}
            key={playerNumber}
            playerNumber={playerNumber}
            selectedPlayer={
              preselectedPlayerIds?.[playerNumbers.indexOf(playerNumber)]
            }
          />
        ))}
        <div className="flew-row flex items-center justify-between">
          <SubmitButton className="mr-4" />
        </div>
      </form>
    </Main>
  );
};

export default RegisterRacePage;
