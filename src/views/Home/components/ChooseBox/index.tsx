import React from 'react';
import styles from "./index.scss";
import SelectBox from "components/SelectBox/index"
import CtrlBtn from "components/CtrlBtn/index"
const ChooseBox = () => {
    let list = [
        {name:'101.4GiB(k=32,temporary space:332GiB)',value:'32'},
        {name:'208.8GiB(k=33,temporary space:589GiB)',value:'33'},
        {name:'429.8GiB(k=34,temporary space:1177GiB)',value:'34'},
        {name:'884.1GiB(k=35,temporary space:2355GiB)',value:'35'}
      ]
    let value = "", status=false
  return (
    <div className={styles.ChooseBox}>
       <SelectBox list={list} placeHold="请选择绘图大小" title="绘图大小" value={value} />
       <CtrlBtn labelStart="开始P盘" labelEnd="全部停止" status={status}  />
       
    </div>
  );
};

export default ChooseBox;
