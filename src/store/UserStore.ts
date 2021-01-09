import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { userProps, riotUserDataProps, positions } from 'types/usetStore.type';
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
  @observable recentPositions = { SUPPORT: 1, JUNGLE: 2, BOTTOM: 12, MID: 3, TOP: 1 };
  @observable recentChampion = {};

  @action
  search = async (userName: string) => {
    this.loading = true;
    try {
      const riotUserData: riotUserDataProps = await api.getUserData(userName);
      // 티어정보
      this.encryptedSummonerId = riotUserData.data.id;
      this.encryptedAccountId = riotUserData.data.accountId;
      const privateData = await api.getPrivateUserData(riotUserData.data.id);

      // 최근 100경기 매치 정보, 마지막경기까지 뽑아와도되고, data에 matchId도 존재
      const recentMathes = await api.getRecentMatches(riotUserData.data.accountId);

      let recentPosition: positions = { SUPPORT: 0, BOTTOM: 0, TOP: 0, JUNGLE: 0, MID: 0 };
      recentMathes.data.matches.forEach(
        ({ lane, role, champion, gameId, timestamp }: { lane: string; role: string; champion: number; gameId: number; timestamp: number }) => {
          // champion 배열 넣기, gameId, season, timestamp
          if (role === 'DUO_SUPPORT') {
            recentPosition.SUPPORT = recentPosition.SUPPORT += 1;
          } else if (role === 'DUO_CARRY') {
            recentPosition.BOTTOM = recentPosition.BOTTOM += 1;
          } else {
            if (lane !== 'NONE') {
              recentPosition = { ...recentPosition, [lane]: ++recentPosition[lane] };
            }
          }

          this.gameInfo.push({ championId: champion, id: gameId, timestamp: timestamp });
        },
      );

      this.getMatchData();

      runInAction(() => {
        this.recentPositions = Object.fromEntries(Object.entries(recentPosition).sort(([, a], [, b]) => b - a)) as any;

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
  getMatchData = async () => {
    // match id 도 넣어야함
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
    this.recentChampion = Object.fromEntries(Object.entries(recentChampion).sort(([, a], [, b]) => b - a));
  };

  // todo: initstate를 원하는 값만 바꾸기
  // @action
  // resetState = (observable: string) => {
  //   this[observable] = initState[observable];
  // };

  @action
  resetDone = () => {
    this.done = false;
  };
}

export default UserStore;
