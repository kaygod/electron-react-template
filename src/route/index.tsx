import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LeftSider from 'components/LeftSider';
import PageOne from 'views/Page1/index';
import PageTwo from 'views/Page2/index';

export default function RouteList() {
  return (
    <Router>
      <div className="main">
        <div className="left">
          <LeftSider />
        </div>
        <div className="right">
          <Switch>
            <Route path="/two" component={PageTwo} />
            <Route path="/" component={PageOne} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
