import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import { call } from "./util/common"; 

const Hello = () => {

  const getSystem = ()=>{
    call("getSystem");
  }  

  return (
    <div>
      <button onClick={getSystem}>Click me</button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}