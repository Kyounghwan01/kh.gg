import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { userProps, riotUserDataProps, positions } from 'types/usetStore.type';
import { participantProps, matchDetailResponse, matchProps } from 'types/champStore.type';
import RootStore from './RootStore';
import ChampStore from './ChampStore';
import dayjs from 'dayjs';

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
  @observable pageParams = { lastPage: 10, currentPage: 1, total: 100 };
  @observable matchInfo = [] as matchProps[];

  @action
  search = async (userName: string) => {
    this.loading = true;
    try {
      const riotUserData: riotUserDataProps = await api.getUserData(userName);
      /** 티어정보 */
      this.encryptedSummonerId = riotUserData.data.id;
      this.encryptedAccountId = riotUserData.data.accountId;
      const privateData = await api.getPrivateUserData(riotUserData.data.id);

      /** 최근 포지션 */
      const { recentPosition, newGameInfo } = await this.getRecentPosition();

      /** 매치 정보 */
      const res = await this.getInitMatchData(newGameInfo);
      this.setMatchData(res);

      /** 최근 사용한 챔피언 */
      const recentChampion = await this.getRecentChamp(newGameInfo);

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
  getRecentChamp = async (newGameInfo: { championId: number; id: number }[]) => {
    let recentChampion: positions = {};

    newGameInfo.forEach(el => {
      const champInfo = this.champStore.champs.find(champ => champ.id === el.championId);
      if (!champInfo) return;

      recentChampion = { ...recentChampion, [champInfo.name]: recentChampion.hasOwnProperty(champInfo.name) ? ++recentChampion[champInfo.name] : 1 };
    });
    return recentChampion;
  };

  @action
  getRecentPosition = async () => {
    // 최근 100경기 매치 정보, 마지막경기까지 뽑아와도되고, data에 matchId도 존재
    const recentMathes = await api.getRecentMatches(this.encryptedAccountId);

    /** 페이지네이션 값 설정 */
    this.pageParams.lastPage = recentMathes.data.totalGames >= 100 ? 10 : Math.floor(recentMathes.data.totalGames / 10) + 1;
    this.pageParams.total = recentMathes.data.totalGames >= 100 ? 100 : recentMathes.data.totalGames;
    this.pageParams.currentPage = 1;

    let recentPosition: positions = { SUPPORT: 0, BOTTOM: 0, TOP: 0, JUNGLE: 0, MID: 0 };
    const newGameInfo = [] as { championId: number; id: number; timestamp: number }[];
    recentMathes.data.matches.forEach(
      ({ lane, role, champion, gameId, timestamp }: { lane: string; role: string; champion: number; gameId: number; timestamp: number }) => {
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
  getInitMatchData = async (newGameInfo: { championId: number; id: number }[]) => {
    let promiseSet = [];
    for (let i = 0; i < newGameInfo.length; i++) {
      if (i > 9) break;
      promiseSet.push(api.getMatchDetail(newGameInfo[i].id));
    }
    const resAll = await Promise.all(promiseSet);
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
  setMatchData = async (matchData: { data: matchDetailResponse }[]) => {
    const newRes: matchProps[] = [];

    matchData.forEach(match => {
      const { participants, participantIdentities, teams, gameCreation, gameDuration, gameId } = match.data;
      const team1: participantProps[] = [];
      const team2: participantProps[] = [];
      const totalKills = { red: 0, blue: 0 };
      const totalGolds = { red: 0, blue: 0 };
      let myTeamId: number = 100;
      let me = {} as participantProps & { win: boolean; totalKill: number };

      participants.forEach((user, index) => {
        const { participantId, championId, spell1Id, spell2Id } = user;
        const {
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          kills,
          deaths,
          assists,
          champLevel,
          totalDamageDealtToChampions,
          totalMinionsKilled,
          perk0,
          perkSubStyle,
          goldEarned,
        } = user.stats;

        const usersMatchData = {
          participantsId: participantId,
          name: participantIdentities[index].player.summonerName,
          matchHistoryUri: participantIdentities[index].player.matchHistoryUri,
          summonerId: participantIdentities[index].player.accountId,
          spell: [this.mappingIdToName('spell', spell1Id) || 'SummonerTeleport', this.mappingIdToName('spell', spell2Id) || 'SummonerFlash'],
          championId: this.mappingIdToName('champion', championId) || 'Samira',
          item: [item0, item1, item2, item6, item3, item4, item5],
          kills,
          assists,
          deaths,
          champLevel,
          totalDamageDealtToChampions,
          totalMinionsKilled,
          rune: [
            this.mappingIdToName('rune', perk0) || 'perk-images/Styles/7200_Domination.png',
            this.mappingIdToName('rune', perkSubStyle) || 'perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          ],
        };

        // 현재 userData가 accout에 있는 usetData와 같은 경우
        if (usersMatchData.summonerId === this.encryptedAccountId) {
          myTeamId = user.teamId;
          const isWin = teams[user.teamId === 100 ? 0 : 1].win === 'Win' ? true : false;
          me = { ...usersMatchData, win: isWin, totalKill: 100 };
        }
        user.teamId === teams[0].teamId ? team1.push(usersMatchData) : team2.push(usersMatchData);

        // faker data 완료시 삭제
        if (index === participants.length - 1 && !Object.keys(me).length) {
          const isWin = teams[user.teamId === 100 ? 0 : 1].win === 'Win' ? true : false;
          me = { ...usersMatchData, win: isWin, totalKill: 100 };
        }

        if (index < 5) {
          totalKills.blue += kills;
          totalGolds.blue += goldEarned;
        } else {
          totalKills.red += kills;
          totalGolds.red += goldEarned;
        }
        if (index === participants.length - 1) {
          me = { ...me, totalKill: myTeamId === 100 ? totalKills.blue : totalKills.red };
        }
      });

      const params = {
        gameCreation: dayjs(gameCreation).format('YYYY.M.DD.'),
        gameDuration:
          gameDuration >= 3600
            ? `${parseInt(String(gameDuration / 3600))}h ${parseInt(String((gameDuration % 3600) / 60))}m ${gameDuration % 60}s`
            : `${Math.floor(gameDuration / 60)}m ${gameDuration - Math.floor(gameDuration / 60) * 60}s`,
        gameRawDuration: gameDuration,
        gameId,
        me,
        teams: [
          {
            win: teams[1].win === 'Win' ? true : false,
            bans: teams[1].bans.map(el => this.mappingIdToName('champion', el.championId) || 'Samira'),
            teamId: teams[1].teamId,
            participants: team2,
            dragonKills: teams[1].dragonKills,
            baronKills: teams[1].baronKills,
            towerKills: teams[1].towerKills,
            totalKills: totalKills.red,
            totalGolds: totalGolds.red,
          },
          {
            win: teams[0].win === 'Win' ? true : false,
            bans: teams[0].bans.map(el => this.mappingIdToName('champion', el.championId) || 'Samira'),
            teamId: teams[0].teamId,
            participants: team1,
            dragonKills: teams[0].dragonKills,
            baronKills: teams[0].baronKills,
            towerKills: teams[0].towerKills,
            totalKills: totalKills.blue,
            totalGolds: totalGolds.blue,
          },
        ],
        isOpenDetail: false,
      };

      if (myTeamId === 100) {
        params.teams.reverse();
      }

      newRes.push(params);
    });

    this.matchInfo = newRes;
  };

  @action
  resetDone = () => {
    this.done = false;
  };

  @action
  searchPage = async (pageNumber: number) => {
    this.loading = true;
    let promiseSet = [];
    for (let i = (pageNumber - 1) * 10; i < pageNumber * 10; i++) {
      promiseSet.push(api.getMatchDetail(this.gameInfo[i].id));
    }
    const resAll = await Promise.all(promiseSet);
    resAll.sort((a: any, b: any) => b.data.gameCreation - a.data.gameCreation);

    this.setMatchData(resAll);
    this.pageParams.currentPage = pageNumber;
    this.loading = false;
  };

  @action
  setOpen = (gameId: number) => {
    const game = this.matchInfo.find(game => game.gameId === gameId);
    if (game) {
      game.isOpenDetail = !game.isOpenDetail;
    }
  };
}

export default UserStore;
