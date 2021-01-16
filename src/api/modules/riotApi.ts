import axios from '../axios';
import { AxiosResponse } from 'axios';
import { AllChampionResponse } from 'types/champStore.type';

const ddragonAddress = 'https://cors-kh.herokuapp.com/https://ddragon.leagueoflegends.com';

export default {
  getUserData: (userName: string) => axios.get(`/lol/summoner/v4/summoners/by-name/${userName}`),

  getPrivateUserData: (encryptedAccountId: string) => axios.get(`/lol/league/v4/entries/by-summoner/${encryptedAccountId}`),

  getRecentMatches: (encryptedAccountId: string) => axios.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`),

  getMatchDetail: (matchId: number) => axios.get(`/lol/match/v4/matches/${matchId}`),

  // ddragon api 버전
  getDdrgonVersion: () => axios.get(`${ddragonAddress}/api/versions.json`),

  // 챔피언 정보
  getChampionInfo: (version: string): Promise<AxiosResponse<AllChampionResponse>> =>
    axios.get(`${ddragonAddress}/cdn/${version}/data/ko_KR/champion.json`),

  // 룬 정보
  getRunInfo: (version: string) => axios.get(`${ddragonAddress}/cdn/${version}/data/ko_KR/runesReforged.json`),

  // 스펠 정보
  getSpellInfo: (version: string) => axios.get(`${ddragonAddress}/cdn/${version}/data/ko_KR/summoner.json`),

  // 챔피언 이미지 -> img tag에 바로 호출할것
  getChampionImg: (champName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${champName}.png`),

  // 프로필 이미지 -> img tag에 바로 호출할것
  getProfileImg: (profileId: number) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileId}.png`),

  // 스펠 이미지 -> img tag에 바로 호출할것
  getSpellImg: (spellName: string) => axios.get(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/spell/${spellName}.png`),

  // 룬이미지 -> img tag에서 바로 호출
  getRuneImg: (runeName: string) => axios.get(`https://ddragon.canisback.com/img/${runeName}`),

  // 아이템 -> img tag에서 호출
  // http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion}/img/item/6632.png
};
