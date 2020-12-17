import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/test';

export interface TestInterface {
  eeee: {
    [index: string]: number;
  };
  currentId: number;
  loading: boolean;
  done: boolean;
  userData: { accountId: string };
  errorMessage: string;
  search: (userName: string) => void;
  toggleTodo: () => void;
}

class TestStore implements TestInterface {
  @observable eeee: { [index: string]: number } = { a: 1, b: 2 };
  @observable currentId = 1;
  @observable loading = false;
  @observable done = false;
  @observable errorMessage = '';
  @observable userData = { accountId: '1' };

  @action toggleTodo = async () => {
    console.log(1);
    this.loading = true;
  };

  @action
  search = async (userName: string) => {
    this.loading = true;

    try {
      const res = await api.getUserData(userName);
      console.log(res);
      // 티어정보
      const res1 = await api.getPrivateUserData(res.data.id);
      // 최근 100경기 매치 정보
      // const res1 = await api.getRecentMatches(res.data.accountId);
      console.log(res1);
      this.userData = res.data;
      this.errorMessage = '';
      this.done = true;
      console.log(this.userData);
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 404) {
        this.errorMessage = '소환사가 존재하지 않습니다!';
      }
    } finally {
      console.log(1);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export default TestStore;
