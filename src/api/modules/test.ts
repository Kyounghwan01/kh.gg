import axios from '../axios';
// const API_KEY = 'RGAPI-3e6ec870-5f4f-4528-bcb9-db78cf2f89ee';

const BASE_URL = '/v2/member/board';

type getNotiType = {
  page: number;
  limit: number;
  all: number;
  type: string;
  studio_id: number;
  title: number | string;
};

type getNotiRes = {
  data: {
    attachments: { id: number }[];
    contents: string;
    created_at: string;
    id: number;
    is_comment: number;
    is_notice: number;
    title: string;
    updated_at: string;
    type: string;
  }[];
  meta: { current_page: number; last_page: number; total: number };
};

export default {
  // 공지
  getNoti: (params: getNotiType) => axios.get<getNotiRes>(BASE_URL, { params }),
  getUserData: (userName: string) => axios.get(`/lol/summoner/v4/summoners/by-name/${userName}`),
  getPrivateUserData: (encryptedAccountId: string) => axios.get(`/lol/league/v4/entries/by-summoner/${encryptedAccountId}`),
  getRecentMatches: (encryptedAccountId: string) => axios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`),
  getChampionInfo: () => axios.get(`https://cors-kh.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/10.1.1/data/ko_KR/champion.json`),
  getChampionImg: (champName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champName}.png`),
};
