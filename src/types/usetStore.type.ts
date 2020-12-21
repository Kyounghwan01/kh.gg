export interface positions {
  [position: string]: number;
}

export interface userProps {
  loading: boolean;
  done: boolean;
  userData: {
    accountId: string;
    summonerLevel: number;
    rank: string;
    tier: string;
    summonerName: string;
    wins: number;
    losses: number;
    leaguePoints: number;
  };
  errorMessage: string;
  encryptedSummonerId: string;
  encryptedSummonerAccountId: string;
  recentPositions: positions;
  search: (userName: string) => void;
  resetDone: () => void;
}

export interface riotUserDataProps {
  data: { id: string; summonerLevel: number; accountId: string };
}
