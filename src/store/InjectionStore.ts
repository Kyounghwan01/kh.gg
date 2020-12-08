import { observable, computed, action } from 'mobx';

class InjectionStore {
  @observable
  _count: number = 0;

  @computed
  get count(): number {
    return this._count;
  }

  @action
  public setCount(count: number) {
    this._count = count;
  }

  @action
  public addNumber(num: number) {
    this._count += num;
  }
}

export default InjectionStore;
