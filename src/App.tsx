import React from 'react';
import './App.global.css';
import store from './store/store';
import { Provider } from 'react-redux';
import RouteList from 'route/index';
// @ts-ignore：无法被执行的代码的错误
import Layout from "./components/Layout/index.tsx";


export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <RouteList />
      </Layout>
    </Provider>
  );
}
