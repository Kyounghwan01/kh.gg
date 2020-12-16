import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/test';
import RootStore from './RootStore';
import TestStore from './TestStore';

export interface ChampInterface {
  champs: any;
  getAllChamps: () => void;
}

class ChampStore implements ChampInterface {
  testStore: TestStore;
  constructor(rootStore: RootStore) {
    this.testStore = rootStore.testStore;
  }

  @observable champs = {};
  // @observable loading = false;

  @action getAllChamps = async () => {
    try {
      this.testStore.loading = true;
      const res = await api.getChampionInfo();
      console.log(res.data);
      runInAction(() => {
        this.champs = res.data.data;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.testStore.loading = false;
    }
  };
}

export default ChampStore;
