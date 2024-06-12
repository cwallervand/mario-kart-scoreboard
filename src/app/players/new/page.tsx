import { createPlayer } from "~/server/serverActions";
import { FormInput } from "~/components/FormInput";
import { SubmitButton } from "~/components/SubmitButton";

const CreatePlayerPage = () => {
  return (
    <main className="flex w-full flex-col">
      <h1>Register new player</h1>
      <form action={createPlayer} className="flex w-full flex-col items-start">
        <FormInput name="name" label="Name" className="mb-6" />
        <FormInput name="handle" label="Handle" className="mb-6" />
        <SubmitButton />
      </form>
    </main>
  );
};

export default CreatePlayerPage;
