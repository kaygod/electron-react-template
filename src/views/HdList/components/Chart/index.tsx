import React from 'react';
import UseRate from "components/UseRate/index";
import styles from "./index.scss";
import { queryAsync, getter, updatePage } from 'store/reducers/HdList';
import { useSelector, useDispatch } from 'react-redux';
const Chart = () => {
  const prop = useSelector(getter);
  const {  table_data: {cpu_rate, memory_rate}} = prop;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.line} ${styles.first}`}>
            <UseRate title="CPU使用率" procent={cpu_rate}/>
          </div>
          <div className={styles.line}>
            <UseRate title="内存使用率" procent={memory_rate}/>
          </div>
      </div>
    </div>
  );
}

export default Chart;
