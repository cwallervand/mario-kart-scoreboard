export type Player = {
  id: string;
  name: string;
  handle?: string;
  avgScore?: number;
  avgFinishingPosition?: number;
};

export type Track = {
  name: string;
};

export type RaceParticipation = {
  platyerId?: string;
  playerName?: string;
  finishingPosition?: number;
  score?: number;
  raceId: string;
  track: string;
  registeredDate: Date;
};
