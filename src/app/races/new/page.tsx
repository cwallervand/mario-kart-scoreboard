"use client";
import { createRef, useEffect, useState, useTransition } from "react";

import { createRace } from "~/server/serverActions";
import { TracksSelect } from "~/components/TracksSelect";
import { PlayerFieldset } from "./_components/PlayerFieldset";
import { SubmitButton } from "~/components/SubmitButton";
import { Main } from "~/components/Main";
import { getAllTracks, getAllPlayers } from "~/server/data";
import type { Track, Player } from "~/app/models";

interface RegisterRacePageProps {
  searchParams: {
    selectedPlayers?: string;
  };
}

const RegisterRacePage = ({ searchParams }: RegisterRacePageProps) => {
  const trackSelectRef = createRef<HTMLSelectElement>();
  const formRef = createRef<HTMLFormElement>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [isPending, startTransition] = useTransition();

  const preselectedPlayerIds = searchParams.selectedPlayers?.split(",");
  const playerNumbers = ["1", "2", "3", "4"];

  useEffect(() => {
    const initiatePageData = () => {
      startTransition(async () => {
        const tracksResult = await getAllTracks();
        const allPlayersResult = await getAllPlayers();

        setTracks(tracksResult);
        setAvailablePlayers(allPlayersResult);
      });
    };

    void initiatePageData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createRace(formData);

    if (trackSelectRef?.current) {
      trackSelectRef.current.value = "";
    }
  };

  return (
    <Main heading="Register new race">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start"
        >
          <TracksSelect tracks={tracks} className="mb-6" ref={trackSelectRef} />
          {playerNumbers.map((playerNumber) => (
            <PlayerFieldset
              players={availablePlayers}
              key={playerNumber}
              playerNumber={playerNumber}
              selectedPlayer={
                preselectedPlayerIds?.[playerNumbers.indexOf(playerNumber)]
              }
            />
          ))}
          <div className="flew-row flex items-center justify-between">
            <SubmitButton className="mr-4" />
            <button
              type="button"
              className="rounded-full  bg-yellow-600 px-5 py-2 text-white"
              onClick={() => {
                formRef.current?.reset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </Main>
  );
};

export default RegisterRacePage;
