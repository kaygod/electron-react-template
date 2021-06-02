import React from 'react';
import UseRate from "components/UseRate/index";
import styles from "./index.scss";

const Chart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.line} ${styles.first}`}>
            <UseRate title="CPU使用率" procent={75}/>
          </div>
          <div className={styles.line}>
            <UseRate title="内存使用率" procent={75}/>
          </div>
      </div>
    </div>
  );
}

export default Chart;
