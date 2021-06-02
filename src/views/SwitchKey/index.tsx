import React from 'react';
import styles from "./index.scss";
import SelectBox from "components/SelectBox/index";
import CtrlBtn from "components/CtrlBtn/index"

const SwitchKey = () => {
  return (
    <div  className={styles.switchkey}>
        <div className={styles.mid_box}>
            <div className={styles.alltext}>
               <div className={styles.title}>请选择您的P盘公钥</div>
               <div className={styles.choice}><SelectBox titleAlwayShow={true} title="farm key" ableInput={true} placeHold="请选择/输入farm key" list={[]}/></div>
               <div className={styles.choice}><SelectBox titleAlwayShow={true} title="pool key" ableInput={true} placeHold="请选择/输入pool key" list={[]}/></div>
               <div className={styles.btn}><CtrlBtn onlyBtn={true} labelStart="确认" status={true}/></div>
            </div>
        </div>
    </div>
  );
};

export default SwitchKey;
