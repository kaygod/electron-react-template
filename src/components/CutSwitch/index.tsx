import React from 'react';
import styles from './index.scss';
import { app, BrowserWindow, ipcRenderer } from 'electron';

const CutSwitch = () => {
  const close = () => {
    ipcRenderer.send('close');
  };
  const min = () => {
    ipcRenderer.send('min');
  };
  return (
    <div className={styles.header}>
      <div className={styles.moveBar}>
        <div className={styles.logos}>
          <div className={styles.imgs}>
            <img src={require('../../images/logo.png').default} alt="" />
          </div>
          <p>左侧</p>
        </div>

        <div className={styles.name}>标题</div>
      </div>
      <div className={styles.switch}>
        <div className={styles.small} onClick={min}>
          <span className="iconfont icon-minus"></span>
        </div>
        <div className={styles.cut} onClick={close}>
          <span className="iconfont icon-close"></span>
        </div>
      </div>
    </div>
  );
};

export default CutSwitch;
