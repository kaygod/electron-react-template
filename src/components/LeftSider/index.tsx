import React from 'react';
import styles from "./index.scss";
import { Link } from 'react-router-dom'


const LeftSider = () => {
  return (

    <div className={styles.leftSider}>
        <div className={styles.lines+' '+styles.current}><span className="iconfont icon-codepen"></span><p><Link to="/">自动化p盘</Link></p> </div>
        <div className={styles.lines}><span className="iconfont icon-desktop"></span><p><Link to="/hd_list">硬件状态</Link></p></div>
        <div className={styles.lines}><span className="iconfont icon-lock"></span><p><Link to="/update_key">切换公钥</Link></p></div>
    </div>
    
  );
}

export default LeftSider;
