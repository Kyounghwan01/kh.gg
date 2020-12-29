export interface champProps {
  champs: any;
  getAllChamps: () => void;
}

export interface AllChampionResponse {
  data: {
    Aatrox: {
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
