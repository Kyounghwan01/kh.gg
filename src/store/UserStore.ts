import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { userProps, riotUserDataProps, positions } from 'types/usetStore.type';
import { participantProps, matchDetailResponse, matchProps } from 'types/champStore.type';
import RootStore from './RootStore';
import ChampStore from './ChampStore';

// const initState = { loading: false, done: false, errorMessage: '', userData: { accountId: '1' } };

class UserStore implements userProps {
  champStore: ChampStore;
  constructor(rootStore: RootStore) {
    this.champStore = rootStore.champStore;
  }

  @observable loading = false;
  @observable done = false;
  @observable errorMessage = '';
  @observable userData = {
    accountId: '0',
    summonerLevel: 1,
    rank: 'IV',
    tier: 'SILVER',
    summonerName: 'newtone',
    wins: 1,
    losses: 1,
    leaguePoints: 1,
  };
  @observable encryptedSummonerId = '';
  @observable encryptedAccountId = '';
  @observable gameInfo = [{ championId: 142, id: 4771757672, timestamp: 1604859413214 }];
  @observable recentPositions = { SUPPORT: 101, JUNGLE: 200, BOTTOM: 12, MID: 3, TOP: 1 };
  @observable recentChampion = {};
  @observable pageParams = { lastPage: 0, currentPage: 0, total: 0 };
  @observable matchInfo = [];

  @action
  search = async (userName: string) => {
    this.loading = true;
    try {
      const riotUserData: riotUserDataProps = await api.getUserData(userName);
      // 티어정보
      this.encryptedSummonerId = riotUserData.data.id;
      this.encryptedAccountId = riotUserData.data.accountId;
      const privateData = await api.getPrivateUserData(riotUserData.data.id);

      /** 최근 포지션 */
      const { recentPosition, newGameInfo } = await this.getRecentPosition();

      /** 매치 정보 */
      let initMatchData = [];
      if (localStorage.getItem('matchData')) {
        initMatchData = JSON.parse(localStorage.getItem('matchData') || '{}');
      } else {
        initMatchData = await this.getInitMatchData();
      }
      this.pageParams.currentPage = 1;
      console.log(initMatchData);
      // todo matchData를 matchInfo로 넣어야함 + matchInfo type정의, champstore 분리

      /** 최근 사용한 챔피언 */
      const recentChampion = await this.getRecentChamp();

      runInAction(() => {
        this.recentPositions = Object.fromEntries(Object.entries(recentPosition).sort(([, a], [, b]) => b - a)) as any;
        this.recentChampion = Object.fromEntries(Object.entries(recentChampion).sort(([, a], [, b]) => b - a));
        this.gameInfo = newGameInfo;

        if (privateData.data.length) {
          this.userData = { summonerLevel: riotUserData.data.summonerLevel, ...privateData.data[0] };
        } else {
          this.userData.summonerName = '';
        }

        this.errorMessage = '';
        this.done = true;
      });
    } catch (e) {
      if (e.response.status === 404) {
        this.errorMessage = '소환사가 존재하지 않습니다. id를 확인해주세요!';
      }
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getRecentChamp = async () => {
    let recentChampion: positions = {};

    this.gameInfo.forEach((el: { championId: number; id: number }) => {
      const champInfo = this.champStore.champs.find(champ => champ.id === el.championId);
      if (!champInfo) return;

      if (recentChampion.hasOwnProperty(champInfo.name)) {
        recentChampion = { ...recentChampion, [champInfo.name]: ++recentChampion[champInfo.name] };
      } else {
        recentChampion = { ...recentChampion, [champInfo.name]: 1 };
      }
    });
    return recentChampion;
  };

  @action
  getRecentPosition = async () => {
    // 최근 100경기 매치 정보, 마지막경기까지 뽑아와도되고, data에 matchId도 존재
    const recentMathes = await api.getRecentMatches(this.encryptedAccountId);

    let recentPosition: positions = { SUPPORT: 0, BOTTOM: 0, TOP: 0, JUNGLE: 0, MID: 0 };
    const newGameInfo = [] as { championId: number; id: number; timestamp: number }[];
    recentMathes.data.matches.forEach(
      ({ lane, role, champion, gameId, timestamp }: { lane: string; role: string; champion: number; gameId: number; timestamp: number }) => {
        // champion 배열 넣기, gameId, season, timestamp
        if (role === 'DUO_SUPPORT' && lane === 'BOTTOM') {
          recentPosition.SUPPORT = recentPosition.SUPPORT += 1;
        } else if (role === 'DUO_CARRY') {
          recentPosition.BOTTOM = recentPosition.BOTTOM += 1;
        } else {
          if (lane !== 'NONE') {
            recentPosition = { ...recentPosition, [lane]: ++recentPosition[lane] };
          }
        }
        newGameInfo.push({ championId: champion, id: gameId, timestamp: timestamp });
      },
    );
    return { recentPosition, newGameInfo };
  };

  @action
  getInitMatchData = async () => {
    let promiseSet = [];
    for (let i = 0; i < this.gameInfo.length; i++) {
      if (i > 9) break;
      promiseSet.push(api.getMatchDetail(this.gameInfo[i].id));
    }
    const resAll = await Promise.all(promiseSet);
    localStorage.setItem('matchData', JSON.stringify(resAll));
    return resAll.sort((a: any, b: any) => b.data.gameCreation - a.data.gameCreation);
  };

  mappingIdToName = (type: string, id: number) => {
    if (type === 'champion') {
      return this.champStore.champs.find(champ => champ.id === id)?.name;
    } else if (type === 'spell') {
      return this.champStore.spell.find(spell => spell.id === id)?.name;
    } else if (type === 'rune') {
      return this.champStore.rune.find(rune => rune.id === id)?.name;
    }
  };

  @action
  setMatchData = async () => {
    const matchData: { data: matchDetailResponse }[] = JSON.parse(localStorage.getItem('matchData') || '{}');
    const newRes: matchProps[] = [];
    matchData.forEach(match => {
      const team1: participantProps[] = [];
      const team2: participantProps[] = [];
      match.data.participants.forEach((user, index) => {
        const usersMatchData = {
          participantsId: user.participantId,
          name: match.data.participantIdentities[index].player.summonerName,
          matchHistoryUri: match.data.participantIdentities[index].player.matchHistoryUri,
          summonerId: match.data.participantIdentities[index].player.accountId,
          spell: [
            this.mappingIdToName('spell', user.spell1Id) || 'SummonerTeleport',
            this.mappingIdToName('spell', user.spell2Id) || 'SummonerFlash',
          ],
          championId: this.mappingIdToName('champion', user.championId) || 'Samira',
          item: [user.stats.item0, user.stats.item1, user.stats.item2, user.stats.item3, user.stats.item4, user.stats.item5, user.stats.item6],
          kills: user.stats.kills,
          assists: user.stats.assists,
          champLevel: user.stats.champLevel,
          totalDamageDealtToChampions: user.stats.totalDamageDealtToChampions,
          totalMinionsKilled: user.stats.totalMinionsKilled,
          rune: [
            this.mappingIdToName('rune', user.stats.perk0) || 'perk-images/Styles/7200_Domination.png',
            this.mappingIdToName('rune', user.stats.perk4) || 'perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          ],
        };
        user.teamId === match.data.teams[0].teamId ? team1.push(usersMatchData) : team2.push(usersMatchData);
      });
      newRes.push({
        gameCreation: match.data.gameCreation,
        gameDuration: match.data.gameDuration,
        gameId: match.data.gameId,
        teams: [
          {
            win: match.data.teams[0].win === 'Win' ? true : false,
            bans: match.data.teams[0].bans.map(el => this.mappingIdToName('champion', el.championId) || 'Samira'),
            teamId: match.data.teams[0].teamId,
            participants: team1,
          },
          {
            win: match.data.teams[1].win === 'Win' ? true : false,
            bans: match.data.teams[1].bans.map(el => this.mappingIdToName('champion', el.championId) || 'Samira'),
            teamId: match.data.teams[1].teamId,
            participants: team2,
          },
        ],
      });
    });
    // match data mapping
    console.log(newRes);
  };

  @action
  resetDone = () => {
    this.pageParams = { lastPage: 0, currentPage: 0, total: 0 };
    this.done = false;
  };
}

export default UserStore;
