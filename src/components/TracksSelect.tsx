import { forwardRef } from "react";
import { FormSelect } from "~/components/FormSelect";
import type { Track } from "~/app/models";

const WORD_SEPARATOR = "_";

const prettifyTrackName = (trackName: string) => {
  const prettifiedTrackName = trackName.replaceAll(WORD_SEPARATOR, " ");

  return prettifiedTrackName;
};

interface TrackSelectProps {
  tracks: Track[];
  hasEmptyDefaultOption?: boolean;
  defaultValue?: string;
  className?: string;
}

export const TracksSelect = forwardRef<HTMLSelectElement, TrackSelectProps>(
  (
    {
      tracks,
      hasEmptyDefaultOption = true,
      defaultValue,
      className,
    }: TrackSelectProps,
    ref,
  ) => {
    const trackSelectOptions = tracks.map((track) => ({
      value: track.name,
      label: prettifyTrackName(track.name),
    }));

    return (
      <FormSelect
        label="Track"
        name="track"
        options={trackSelectOptions}
        hasEmptyDefaultOption={hasEmptyDefaultOption}
        defaultValue={defaultValue}
        className={className}
        ref={ref}
      />
    );
  },
);

TracksSelect.displayName = "TracksSelect";
