import { createPlayer } from "~/server/serverActions";
import { FormInput } from "~/components/FormInput";
import { SubmitButton } from "~/components/SubmitButton";
import { Heading } from "~/components/Heading";

const CreatePlayerPage = () => {
  return (
    <main className="flex w-full flex-col">
      <Heading level={1}>Register new player</Heading>
      <form action={createPlayer} className="flex w-full flex-col items-start">
        <FormInput name="name" label="Name" className="mb-6" />
        <FormInput name="handle" label="Handle" className="mb-6" />
        <SubmitButton />
      </form>
    </main>
  );
};

export default CreatePlayerPage;
