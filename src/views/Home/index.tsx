import React, { useState } from 'react';
import { call } from '../../util/common';
import { useSelector } from 'react-redux'
import { getter } from "store/reducers/Global";
import Header from "./components/Header/index"
import ChooseBox from "./components/ChooseBox/index"
import Table from "./components/Table/index"
import styles from "./index.scss";

const Home = () => {

  const data = useSelector(getter);

  console.log(data);

  let [list, setList] = useState([{}]);
 

  return (
    <div className={styles.home}>
      <Header/>
      <ChooseBox/>
      <Table/>
    </div>
  );
};

export default Home;
