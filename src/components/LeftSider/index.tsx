import React,{useState} from 'react';
import styles from "./index.scss";
import { useHistory, useLocation } from 'react-router-dom'


const LeftSider = () => {
  const routerList = [
    {path:'/',name:'自动化p盘',icon:'icon-codepen'},
    {path:'/hd_list',name:'硬件状态',icon:'icon-desktop'},
    {path:'/update_key',name:'切换公钥',icon:'icon-lock'}
  ]
  const history = useHistory();
  let { pathname } = useLocation()
  return (

    <div className={styles.leftSider}>
      {
        routerList.map((val,index)=>{
          return (
             <div className={`${styles.lines} ${pathname==val.path?styles.current:''}`} onClick={()=>{
               history.push(val.path)
              }}><span className={"iconfont "+val.icon }></span><p>{val.name}</p> </div>
          )
        })
      }
        {/* <div className={styles.lines+' '+styles.current}><span className="iconfont icon-codepen"></span><p><Link to="/">自动化p盘</Link></p> </div>
        <div className={styles.lines}><span className="iconfont icon-desktop"></span><p><Link to="/hd_list">硬件状态</Link></p></div>
        <div className={styles.lines}><span className="iconfont icon-lock"></span><p><Link to="/update_key">切换公钥</Link></p></div> */}
    </div>
    
  );
}

export default LeftSider;
