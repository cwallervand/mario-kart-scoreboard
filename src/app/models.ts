export type Player = {
  id: string;
  name: string;
  handle?: string;
  avgScore?: number;
  avgFinishingPosition?: number;
};

export type HeatParticipation = {
  heatId: string;
  heatDate: Date;
  playerName: string;
  playerHandle?: string;
  finishingPosition: number;
  score?: number;
};
