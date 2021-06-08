import React from 'react';
import './App.global.scss';
import store from './store/store';
import { Provider } from 'react-redux';
import RouteList from 'route/index';
import Layout from "components/Layout/index";


export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <RouteList />
      </Layout>
    </Provider>
  );
}
