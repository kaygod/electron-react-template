import React from 'react';
import styles from "./index.scss";
import { useSelector } from 'react-redux'
import { getter, updateType,getMachineDataAsync} from "store/reducers/Home";
import { getter as globalGetter} from "store/reducers/Global";
import { useDispatch } from 'react-redux';


const Header = () => {

  const { end_tasks,working_tasks,type } = useSelector(getter);
  const { chia_key } = useSelector(globalGetter);
  const dispatch = useDispatch()
  return (
    <div className={styles.header}>
        <div className={`${styles.headerItem} ${type=='1'&&styles.active}`} onClick={()=>{
          dispatch(updateType('1'))
          chia_key && dispatch(getMachineDataAsync())
        }}>
            <div className={styles.itemName}>正在运行P盘数</div>
            <div className={styles.itemVal}>{working_tasks}</div>
        </div>
        <div className={`${styles.headerItem} ${type=='2'&&styles.active}`} onClick={()=>{
            dispatch(updateType('2'))
            chia_key && dispatch(getMachineDataAsync())
          }}>
            <div className={styles.itemName}>已完成P盘数</div>
            <div className={styles.itemVal}>{end_tasks}</div>
        </div>
    </div>
  );
  
};

export default Header;
