import { action, observable, runInAction, flow, toJS } from 'mobx';
import api from 'api/modules/test';

export interface TestInterface {
  eeee: {
    [index: string]: number;
  };
  currentId: number;
  loading: boolean;
  userData: any;
  search: (userName: string) => void;
  toggleTodo: () => void;
}

class TestStore implements TestInterface {
  @observable eeee: { [index: string]: number } = { a: 1, b: 2 };
  @observable currentId = 1;
  @observable loading = false;
  @observable userData: { accountId: string } = { accountId: '1' };

  fetchApi = (params: boolean): any => {
    return new Promise(res => {
      window.setTimeout(function () {
        console.log(222);
        if (params) {
          res('ok');
        } else {
          res('error');
        }
      }, 1000);
    });
  };

  @action toggleTodo = async () => {
    console.log(1);
    this.loading = true;
  };

  @action
  search = async (userName: string) => {
    this.loading = true;
    // this.loading = false;

    // try {
    const res = await api.getUserData(userName);
    console.log(res);
    // 티어정보
    const res1 = await api.getPrivateUserData(res.data.id);
    // 최근 100경기 매치 정보
    // const res1 = await api.getRecentMatches(res.data.accountId);
    console.log(res1);
    this.userData = res.data;
    console.log(this.userData);
    this.loading = false;

    // } catch {
    // } finally {
    //   console.log(1);
    //   this.loading = false;
    //   runInAction(() => {
    //     this.loading = false;
    //   });
    // }
  };
}

export default TestStore;
