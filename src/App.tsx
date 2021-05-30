import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
const path = require("path");
const exec = require("child_process").exec;

const Hello = () => {

  const getSystem = ()=>{
     
    const script_path = path.join(__dirname, "scripts", "getSystem.sh"); 
    
    exec(`/bin/bash ${script_path}`, (error, stdout) => {
       if(error){
         console.log(error);
       }else{
         console.log(`stdout: ${stdout}`);
       }
    });

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