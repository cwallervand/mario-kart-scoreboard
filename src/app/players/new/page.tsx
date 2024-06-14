import { createPlayer } from "~/server/serverActions";
import { FormInput } from "~/components/FormInput";
import { SubmitButton } from "~/components/SubmitButton";
import { Main } from "~/components/Main";

const CreatePlayerPage = () => {
  return (
    <Main heading="Register new player">
      <form action={createPlayer} className="flex w-full flex-col items-start">
        <FormInput name="name" label="Name" className="mb-6" autoFocus />
        <FormInput name="handle" label="Handle" className="mb-6" />
        <SubmitButton />
      </form>
    </Main>
  );
};

export default CreatePlayerPage;
