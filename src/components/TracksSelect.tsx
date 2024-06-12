import { db } from "~/server/db";
import { FormSelect } from "~/components/FormSelect";

const WORD_SEPARATOR = "_";

const prettifyTrackName = (trackName: string) => {
  const prettifiedTrackName = trackName.replaceAll(WORD_SEPARATOR, " ");

  return prettifiedTrackName;
};

export const TracksSelect = async ({ ...rest }) => {
  const tracks = await db.query.tracks.findMany();

  const trackSelectOptions = tracks.map((track) => ({
    value: track.name,
    label: prettifyTrackName(track.name),
  }));

  return (
    <FormSelect
      label="Track"
      name="track"
      options={trackSelectOptions}
      {...rest}
    />
  );
};
