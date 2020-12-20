import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import RootStore from './RootStore';
import UserStore from './UserStore';

export interface ChampInterface {
  champs: any;
  getAllChamps: () => void;
}

class ChampStore implements ChampInterface {
  userStore: UserStore;
  constructor(rootStore: RootStore) {
    this.userStore = rootStore.userStore;
  }

  @observable champs = {};

  @action getAllChamps = async () => {
    try {
      this.userStore.loading = true;
      const res = await api.getChampionInfo();
      console.log(res.data);
      runInAction(() => {
        this.champs = res.data.data;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.userStore.loading = false;
    }
  };
}

export default ChampStore;
