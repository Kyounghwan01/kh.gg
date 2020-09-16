import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Counter } from "component/Counter";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Counter} />
      </Switch>
    </Router>
  );
}
