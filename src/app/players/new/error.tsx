"use client";

const CreatePlayerErrorPage = ({ reset }: { reset: () => void }) => {
  return (
    <main>
      <h1>Woops!</h1>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
};

export default CreatePlayerErrorPage;
