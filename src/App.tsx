import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Routes from 'page/Routes';
import RootStore from 'store/RootStore';

const rootStore = new RootStore();

export default class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Routes />
      </Provider>
    );
  }
}
