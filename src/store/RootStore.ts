import UserStore from './UserStore';
import InjectionStore from './InjectionStore';
import ChampStore from './ChampStore';

class RootStore {
  userStore: UserStore;
  injectionStore: InjectionStore;
  champStore: ChampStore;

  constructor() {
    this.userStore = new UserStore();
    this.injectionStore = new InjectionStore();
    this.champStore = new ChampStore(this);
  }
}

export default RootStore;
