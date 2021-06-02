import React from 'react';
import styles from "./index.scss";

const Header = () => {
    let list = [
        {name:'已完成P盘数',value:'0'},
        {name:'正在运行的P盘数',value:'0'}
      ]
  return (
    <div className={styles.header}>
        {
            list.map(val=>{
                return(
                    <div className={styles.headerItem}>
                        <div className={styles.itemName}>{val.name}</div>
                        <div className={styles.itemVal}>{val.value}</div>
                    </div>
                )
            })
        }
    </div>
  );
};

export default Header;
