import React from 'react';
import styles from "./index.scss";
import SelectBox from "components/SelectBox/index"
import CtrlBtn from "components/CtrlBtn/index"
import {  useDispatch,useSelector } from 'react-redux'
import { updateKType,getter } from 'store/reducers/Home/index';


const ChooseBox = () => {

    const dispatch = useDispatch();

    const { k_type } = useSelector(getter);

    const list = [
        {name:'101.4GiB(k=32,temporary space:332GiB)',value:'32'},
        {name:'208.8GiB(k=33,temporary space:589GiB)',value:'33'},
        {name:'429.8GiB(k=34,temporary space:1177GiB)',value:'34'},
        {name:'884.1GiB(k=35,temporary space:2355GiB)',value:'35'}
    ]

    const onChange = (item:{name:string,value:string})=>{
      const {value} = item; 
      dispatch(updateKType(value));
    }

  return (
    <div className={styles.ChooseBox}>
       <SelectBox onChange={onChange} list={list} placeHold="请选择绘图大小" title="绘图大小" value={k_type} />
       <CtrlBtn/> 
    </div>
  );
};

export default ChooseBox;
