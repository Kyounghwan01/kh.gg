import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from 'page/Search';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/summoner/:id" component={Search} />
      </Switch>
    </Router>
  );
}
