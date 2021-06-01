import React from 'react';
import './App.global.css';
import store from './store/store';
import { Provider } from 'react-redux';
import RouteList from 'route/index';
import Layout from "components/Layout/index";
import LeftSider from "components/LeftSider/index";
import CutSwitch from "components/CutSwitch/index";

export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div className="main">
            <div className="link"><CutSwitch/></div>           
            <div className="left">
               <LeftSider/>
            </div>
            <div className="right">
               <RouteList />
            </div>  
        </div>
      </Layout>
    </Provider>
  );
}
