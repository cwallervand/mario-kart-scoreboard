"use client";
import { Heading } from "~/components/Heading";

const CreatePlayerErrorPage = ({ reset }: { reset: () => void }) => {
  return (
    <main>
      <Heading level={1}>Woops!</Heading>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
};

export default CreatePlayerErrorPage;
