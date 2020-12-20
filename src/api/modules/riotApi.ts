import axios from '../axios';

export default {
  getUserData: (userName: string) => axios.get(`/lol/summoner/v4/summoners/by-name/${userName}`),

  getPrivateUserData: (encryptedAccountId: string) => axios.get(`/lol/league/v4/entries/by-summoner/${encryptedAccountId}`),

  getRecentMatches: (encryptedAccountId: string) => axios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`),

  getChampionInfo: () => axios.get(`https://cors-kh.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/10.1.1/data/ko_KR/champion.json`),

  getChampionImg: (champName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champName}.png`),
};
