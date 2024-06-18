import { currentUser } from "@clerk/nextjs/server";

import { Main } from "~/components/Main";
import { GoTo } from "~/components/GoTo";

const RacesPages = async () => {
  const cu = await currentUser();
  const userCanRegisterRaces = !!cu?.privateMetadata.canRegisterRaces;
  return (
    <Main heading="Races">
      {userCanRegisterRaces && (
        <GoTo href="/races/new" className="mb-4 self-start">
          Register new race
        </GoTo>
      )}
    </Main>
  );
};

export default RacesPages;
