import { action, observable, toJS } from 'mobx';

export interface TestInterface {
  eeee: {
    [index: string]: number;
  };
  currentId: number;
  addTodo: () => void;
}

class TestStore implements TestInterface {
  @observable eeee: { [index: string]: number } = { a: 1, b: 2 };
  @observable currentId = 1;

  @action
  addTodo = () => {
    Object.keys(this.eeee).map(el => (this.eeee[el] = 3333));
    console.log(this.eeee); // {$mobx: ObservableObjectAdministration} -> {a: 333, b: 333}
    console.log(toJS(this.eeee)); // {a: 333, b: 333}
  };
}

export default TestStore;
