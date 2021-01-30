import UserStore from './UserStore';
import ChampStore from './ChampStore';

class RootStore {
  userStore: UserStore;
  champStore: ChampStore;

  constructor() {
    this.champStore = new ChampStore();
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
