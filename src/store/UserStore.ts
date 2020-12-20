import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';

export interface userProps {
  loading: boolean;
  done: boolean;
  userData: { accountId: string };
  errorMessage: string;
  search: (userName: string) => void;
  resetDone: () => void;
}

// const initState = { loading: false, done: false, errorMessage: '', userData: { accountId: '1' } };

class UserStore implements userProps {
  @observable loading = false;
  @observable done = false;
  @observable errorMessage = '';
  @observable userData = { accountId: '1' };

  @action
  search = async (userName: string) => {
    this.loading = true;
    try {
      const res = await api.getUserData(userName);
      // 티어정보
      const res1 = await api.getPrivateUserData(res.data.id);
      // 최근 100경기 매치 정보
      // const res1 = await api.getRecentMatches(res.data.accountId);
      console.log(res1);
      this.userData = res.data;
      this.errorMessage = '';
      this.done = true;
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
