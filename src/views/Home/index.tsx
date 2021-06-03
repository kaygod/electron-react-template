import React from 'react';
import Header from "./components/Header/index"
import ChooseBox from "./components/ChooseBox/index"
import Table from "./components/Table/index"
import styles from "./index.scss";

const Home = () => { 

  return (
    <div className={styles.home}>
      <Header/>
      <ChooseBox/>
      <Table/>
    </div>
  );
};

export default Home;
