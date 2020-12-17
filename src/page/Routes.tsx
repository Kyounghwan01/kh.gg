import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from 'page/Search';
import User from 'page/User';
import NoMatch from 'page/NoMatch';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/user" component={User} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}
