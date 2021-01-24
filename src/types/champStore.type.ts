export interface champProps {
  champs: { id: number; name: string }[];
  spell: { id: number; name: string }[];
  rune: { id: number; name: string; img: string }[];
  ddragonVersion: string;
  getAllChamps: () => void;
  champLoading: boolean;
}

export interface AllChampionResponse {
  data: {
    [champ: string]: {
      blurb: string;
      id: string;
      image: { full: string; sprite: string; group: string };
      info: { attack: number; defense: number; magic: number; difficulty: number };
      key: string;
      name: string;
      partype: string;
      tags: string[];
      title: string;
    };
  };
}

export interface runeResponse {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: {
      id: number;
      key: string;
      icon: string;
      name: string;
    }[];
  }[];
}

export interface spellResponse {
  data: {
    [spellType: string]: {
      key: string; // '21'
      id: string; // SummonerBarrier
    };
  };
}

// todo: matchHistoryUri로 해당 유저 누르면 그 유저의 최근 전적 및 그 유저의 정보 가져오기
export interface matchDetailResponse {
  gameCreation: number; // new Date(1610527482626)
  gameDuration: number; // 15*60 + 21
  gameId: number;
  teams: { teamId: number; win: string; bans: { championId: number }[]; baronKills: number; dragonKills: number; towerKills: number }[];
  participantIdentities: {
    participantId: number;
    player: {
      matchHistoryUri: string;
      summonerName: string;
      accountId: string;
    };
  }[];
  participants: {
    championId: number;
    participantId: number;
    spell1Id: number;
    spell2Id: number;
    teamId: number;
    stats: {
      deaths: number;
      kills: number;
      assists: number;
      champLevel: number;
      totalDamageDealtToChampions: number; // 챔피언 가한 피해
      totalMinionsKilled: number; // 미니언
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      perk0: number; // 1순위 룬
      perkSubStyle: number; // 2순위 룬
      goldEarned: number;
    };
  }[];
}

export interface participantProps {
  participantsId: number;
  name: string;
  summonerId: string;
  matchHistoryUri: string;
  spell: string[];
  championId: string;
  item: number[];
  kills: number;
  assists: number;
  champLevel: number;
  totalDamageDealtToChampions: number;
  totalMinionsKilled: number;
  rune: string[];
  deaths: number;
}
export interface matchProps {
  gameCreation: string;
  gameDuration: string;
  gameRawDuration: number;
  gameId: number;
  teams: {
    win: boolean;
    teamId: number; // teamId 100 -> blue
    bans: string[];
    participants: participantProps[];
    dragonKills: number;
    baronKills: number;
    towerKills: number;
    totalKills: number;
    totalGolds: number;
  }[];
  me: participantProps & { win: boolean; totalKill: number };
  isOpenDetail: boolean;
}
