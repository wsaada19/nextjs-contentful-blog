export type TeamData = {
  name: string;
  city: string;
  color: string;
  subreddit: string;
  logo: string;
  teamId: number;
  offRating: number;
  defRating: number;
  wins: number;
  subscribers: number;
};

export type TeamBettingData = {
  team: string;
  color: string;
  logo: string;
  overs: number;
  unders: number;
};
