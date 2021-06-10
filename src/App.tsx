import React from 'react';
import './App.global.css';
import store from './store/store';
import { Provider } from 'react-redux';
import RouteList from 'route/index';
import Layout from "components/Layout/index";
import { call } from "util/common";


export default function App() {

  console.log("test1111");
  call("page_1").then((res)=>{
    console.log(res);
    console.log(JSON.stringify(res));
  }).catch((err)=>{
    console.log(err);
  })

  call("getSystem").then((res)=>{
    console.log(res);
    console.log(JSON.stringify(res));
  }).catch((err)=>{
    console.log(err);
  })


  return (
    <Provider store={store}>
      <Layout>
        <RouteList />
      </Layout>
    </Provider>
  );
}
