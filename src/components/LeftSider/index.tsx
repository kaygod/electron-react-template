import React from 'react';
import styles from "./index.scss";

const LeftSider = () => {
  return (
    <div className={styles.leftsider}>
        <div className={styles.lines+' '+styles.current}><span className="iconfont icon-codepen"></span><p>自动化P盘</p> </div>
        <div className={styles.lines}><span className="iconfont icon-desktop"></span><p>硬件状态</p></div>
        <div className={styles.lines}><span className="iconfont icon-lock"></span><p>切换公钥</p></div>
    </div>
  );
}

export default LeftSider;
