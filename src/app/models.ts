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
  playerName: string;
  playerHandle?: string;
  finishingPosition?: number;
  score?: number;
  raceId: string;
  track: string;
  registeredDate: Date;
};

export type HeatParticipation = {
  heatId: string;
  heatDate: Date;
  playerName: string;
  playerHandle?: string;
  finishingPosition: number;
  score?: number;
};
