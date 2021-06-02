import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'views/Home/index';
import HdList from "views/HdList/index";
import UpdateKey from "views/UpdateKey/index";
import LeftSider from "components/LeftSider/index";

export default function RouteList() {
  return (
    <Router>
      <div className="main">
        <div className="left">
            <LeftSider/>
          </div>
          <div className="right">
          <Switch>
            <Route path="/hd_list" component={HdList} />
            <Route path="/update_key" component={UpdateKey} />
            <Route path="/" component={Home} /> 
          </Switch>
        </div>
      </div>  
    </Router>
  );
}
