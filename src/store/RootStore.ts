import UserStore from './UserStore';
import InjectionStore from './InjectionStore';
import ChampStore from './ChampStore';

class RootStore {
  userStore: UserStore;
  injectionStore: InjectionStore;
  champStore: ChampStore;

  constructor() {
    this.champStore = new ChampStore();
    this.userStore = new UserStore(this);
    this.injectionStore = new InjectionStore();
  }
}

export default RootStore;
