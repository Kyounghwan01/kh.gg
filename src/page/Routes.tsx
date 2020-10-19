import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Counter } from 'component/Counter';
import Search from 'page/Search';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/counter" component={Counter} />
      </Switch>
    </Router>
  );
}
