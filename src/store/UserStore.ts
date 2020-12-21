import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { userProps, riotUserDataProps, positions } from 'types/usetStore.type';

// const initState = { loading: false, done: false, errorMessage: '', userData: { accountId: '1' } };

class UserStore implements userProps {
  @observable loading = false;
  @observable done = false;
  @observable errorMessage = '';
  @observable userData = {
    accountId: '1',
    summonerLevel: 1,
    rank: 'IV',
    tier: 'SILVER',
    summonerName: 'Newtone',
    wins: 1,
    losses: 1,
    leaguePoints: 1,
  };
  @observable encryptedSummonerId = '';
  @observable encryptedSummonerAccountId = '';
  @observable gameId = '';
  @observable recentPositions = {};

  @action
  search = async (userName: string) => {
    this.loading = true;
    try {
      const riotUserData: riotUserDataProps = await api.getUserData(userName);
      // 티어정보
      console.log(riotUserData);
      this.encryptedSummonerId = riotUserData.data.id;
      this.encryptedSummonerId = riotUserData.data.accountId;
      const privateData = await api.getPrivateUserData(riotUserData.data.id);

      // 최근 100경기 매치 정보, 마지막경기까지 뽑아와도되고, data에 matchId도 존재
      const recentMathes = await api.getRecentMatches(riotUserData.data.accountId);

      let recentPosition: positions = {};
      recentMathes.data.matches.forEach(({ lane }: { lane: string }) => {
        if (lane !== 'NONE') {
          if (Object.keys(recentPosition).find(key => key === lane)) {
            recentPosition = { ...recentPosition, [lane]: ++recentPosition[lane] };
          } else {
            recentPosition = { ...recentPosition, [lane]: 1 };
          }
        }
      });

      runInAction(() => {
        this.recentPositions = recentPosition;
        this.userData = { summonerLevel: riotUserData.data.summonerLevel, ...privateData.data[0] };
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

  // todo: initstate를 원하는 값만 바꾸기
  // @action
  // resetState = (observable: any) => {
  //   this[observable] = initState[observable];
  // };

  @action
  resetDone = () => {
    this.done = false;
  };
}

export default UserStore;
