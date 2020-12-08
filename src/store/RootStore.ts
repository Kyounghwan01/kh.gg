import TestStore from './TestStore';
import InjectionStore from './InjectionStore';

class RootStore {
  testStore: TestStore;
  injectionStore: InjectionStore;

  constructor() {
    this.testStore = new TestStore();
    this.injectionStore = new InjectionStore();
  }
}

export default RootStore;
