import axios from '../axios';
import { AxiosResponse } from 'axios';
import { AllChampionResponse } from 'types/champStore.type';

// const spellData: string[] = [
//   'SummonerBoost',
//   '',
//   'SummonerExhaust',
//   'SummonerFlash',
//   '',
//   'SummonerHaste',
//   'SummonerHeal',
//   '',
//   '',
//   '',
//   'SummonerSmite',
//   'SummonerTeleport',
//   'SummonerMana',
//   'SummonerDot',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
//   'SummonerBarrier',
// ];

export default {
  getUserData: (userName: string) => axios.get(`/lol/summoner/v4/summoners/by-name/${userName}`),

  getPrivateUserData: (encryptedAccountId: string) => axios.get(`/lol/league/v4/entries/by-summoner/${encryptedAccountId}`),

  getRecentMatches: (encryptedAccountId: string) => axios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`),

  // ddragon api 버전
  getDdrgonVersion: () => axios.get('https://cors-kh.herokuapp.com/https://ddragon.leagueoflegends.com/api/versions.json'),

  // 챔피언 정보
  getChampionInfo: (version: string): Promise<AxiosResponse<AllChampionResponse>> =>
    axios.get(`https://cors-kh.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`),

  // 챔피언 이미지 -> img tag에 바로 호출할것
  getChampionImg: (champName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${champName}.png`),

  // 프로필 이미지 -> img tag에 바로 호출할것
  getProfileImg: (profileId: number) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileId}.png`),

  // 스펠 이미지 -> img tag에 바로 호출할것
  getSpellImg: (spellName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/spell/${spellName}.png`),
};
