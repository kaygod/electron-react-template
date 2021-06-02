import React from 'react';
import styles from "./index.scss";
import { app, BrowserWindow, ipcMain } from 'electron'
const CutSwitch = () => {
  return (
    <div className={styles.header}>
      <div className={styles.moveBar}></div>
      <div className={styles.switch}>
                <div className={styles.small}><span className="iconfont icon-minus"></span></div>
                <div className={styles.cut}><span className="iconfont icon-close"></span></div>
        </div>
    </div>
  );
};

export default CutSwitch;
