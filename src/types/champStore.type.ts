export interface champProps {
  champs: { id: number; name: string }[];
  spell: { [id: number]: string };
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
// 1. participantIdentities의 accountId가 userdata의 accountId와 같은 것 찾고 participantIdentities의 배열 Index 기억
// 2. participantIdentities의 배열 Index와 participants 배열 index 같음 -> participants와 participantIdentities 필요한 정보 맵핑 필요
export interface matchDetailResponse {
  gameCreation: 1610527482626; // new Date(1610527482626)
  gameDuration: 921; // 15*60 + 21
  teams: { teamId: number; win: string }[];
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
      perk4: number; // 2순위 룬
    };
  }[];
}
// teamId 100 -> red

// blurb: "한때는 공허에 맞서 싸웠던 슈리마의 명예로운 수호자 아트록스와 그의 종족은 결국 공허보다 위험한 존재가 되어 룬테라의 존속을 위협했지만, 교활한 필멸자의 마법에 속아넘어가 패배하게 되었다. 수백 년에 걸친 봉인 끝에, 아트록스는 자신의 정기가 깃든 마법 무기를 휘두르는 어리석은 자들을 타락시키고 육신을 바꾸는 것으로 다시 한번 자유의 길을 찾아내었다. 이제 이전의 잔혹한 모습을 닮은 육체를 차지한 아트록스는 세상의 종말과 오랫동안 기다려온 복수를..."
// id: "Aatrox"
// image: {full: "Aatrox.png", sprite: "champion0.png", group: "champion", x: 0, y: 0, w: 48, h: 48}
// info: {attack: 8, defense: 4, magic: 3, difficulty: 4}
// key: "266"
// name: "아트록스"
// partype: "피의 샘"
// stats: {hp: 580, hpperlevel: 90, mp: 0, mpperlevel: 0, movespeed: 345, armor: 38, armorperlevel: 3.25,…}
// tags: ["Fighter", "Tank"]
// title: "다르킨의 검"
// version: "10.1.1"
