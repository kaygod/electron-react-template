import React from 'react';
import styles from "./index.scss";
import { useSelector } from 'react-redux'
import { getter } from "store/reducers/Home";


const Header = () => {

  const { end_tasks,working_tasks } = useSelector(getter);

  return (
    <div className={styles.header}>
        <div className={styles.headerItem}>
            <div className={styles.itemName}>已完成P盘数</div>
            <div className={styles.itemVal}>{end_tasks}</div>
        </div>
        <div className={styles.headerItem}>
            <div className={styles.itemName}>正在运行的P盘数</div>
            <div className={styles.itemVal}>{working_tasks}</div>
        </div>
    </div>
  );
  
};

export default Header;
