import React,{useEffect} from 'react';
import styles from "./index.scss";
import Table from "./components/Table/index";
import Chart from "./components/Chart/index";

const HdList = () => {
  return (
    <div className={styles.hdList}>
        <div className={styles.left}>
          <Table/>
        </div>
        <div className={styles.right}>
          <Chart />
        </div>
    </div>
  );
}

export default HdList;
