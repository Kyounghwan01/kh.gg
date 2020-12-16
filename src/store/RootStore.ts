import TestStore from './TestStore';
import InjectionStore from './InjectionStore';
import ChampStore from './ChampStore';

class RootStore {
  testStore: TestStore;
  injectionStore: InjectionStore;
  champStore: ChampStore;

  constructor() {
    this.testStore = new TestStore();
    this.injectionStore = new InjectionStore();
    this.champStore = new ChampStore(this);
  }
}

export default RootStore;
