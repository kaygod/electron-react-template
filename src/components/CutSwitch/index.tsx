import React from 'react';
import styles from "./index.scss";
import { app, BrowserWindow, ipcRenderer } from 'electron'
const CutSwitch = () => {
  const close = ()=>{
    ipcRenderer.send('close')
  }
  const min = ()=>{
    ipcRenderer.send('min')
  }
  return (
    <div className={styles.header}>
      <div className={styles.moveBar}></div>
      <div className={styles.switch}>
                <div className={styles.small} onClick={min}><span className="iconfont icon-minus"></span></div>
                <div className={styles.cut} onClick={close}><span className="iconfont icon-close"></span></div>
        </div>
    </div>
  );
};

export default CutSwitch;
