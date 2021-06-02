import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'views/Home/index';
import SwitchKey from 'views/SwitchKey/index';

export default function RouteList() {
  return (
    <Router>
      <Switch>
        {/*<Route path="/" component={Home} />*/}
        <Route path="/" component={SwitchKey} />
      </Switch>
    </Router>
  );
}
