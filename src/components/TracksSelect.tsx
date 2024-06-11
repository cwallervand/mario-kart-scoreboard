import { db } from "~/server/db";
import { FormSelect } from "~/components/FormSelect";

export const TracksSelect = async () => {
  const tracks = await db.query.tracks.findMany();

  const trackSelectOptions = tracks.map((track) => ({
    value: track.name,
    label: track.name,
  }));

  return <FormSelect label="Track" name="track" options={trackSelectOptions} />;
};
