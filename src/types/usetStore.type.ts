import { matchDetailResponse, matchProps } from './champStore.type';

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
  encryptedAccountId: string;
  recentPositions: { [k: string]: number };
  gameInfo: { championId: number; id: number; timestamp: number }[];
  recentChampion: positions;
  pageParams: { lastPage: number; currentPage: number; total: number };
  matchInfo: matchProps[];
  search: (userName: string) => void;
  resetDone: () => void;
  setMatchData: (matchData: { data: matchDetailResponse }[]) => void;
}

export interface riotUserDataProps {
  data: { id: string; summonerLevel: number; accountId: string };
}
