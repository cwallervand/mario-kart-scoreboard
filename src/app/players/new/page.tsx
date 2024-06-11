import { db } from "~/server/db";
import { createPlayer } from "~/server/serverActions";

const RegisterPlayerPage = () => {
  console.log("RegisterPlayerPage");

  return (
    <main>
      <h1>Register new player</h1>
      <form action={createPlayer}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="handle">Handle</label>
          <input type="text" name="handle" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default RegisterPlayerPage;
