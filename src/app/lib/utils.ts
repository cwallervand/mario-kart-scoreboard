type PositionWithScore = Record<string, number>;

export const finishingPositionsWithScore: PositionWithScore = {
  "1": 15,
  "2": 12,
  "3": 10,
  "4": 9,
  "5": 8,
  "6": 7,
  "7": 6,
  "8": 5,
  "9": 4,
  "10": 3,
  "11": 2,
  "12": 1,
};

export const prettifyPlayerName = (name: string, handle?: string) => {
  return `${name}${handle ? ` (${handle})` : ""}`;
};
