import React,{useState,useEffect} from 'react';
import './App.global.css';
import store from './store/store';
import { Provider } from 'react-redux';
import RouteList from 'route/index';
import Layout from "components/Layout/index";
import { call } from "util/common";


export default function App() {

  /*call("page_1").then((res)=>{
    console.log(JSON.stringify(res));
  }).catch((err)=>{
    console.log(err);
  })*/

  return (
    <Provider store={store}>
      <Layout>
        <RouteList />
      </Layout>
    </Provider>
  );
}
