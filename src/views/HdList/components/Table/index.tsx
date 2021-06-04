import React,{useState,useEffect} from 'react';
import styles from "./index.scss";
import TableGrid from "components/TableGrid/index";
import { queryAsync, getter, updatePage } from 'store/reducers/HdList';
import { useSelector, useDispatch } from 'react-redux';
import {useLoop} from 'HOC/Loop'
const Table = () => {
  const dispatch = useDispatch();
  const prop = useSelector(getter);
  const {  table_data: {page_no, total_page,list=[] }} = prop;
  useLoop(()=>{
    dispatch(queryAsync())
  })

  const column = [
    {
      name:"硬盘",
      dataIndex:"hard_disk",
      className:'bac',
      key:"hard_disk",
      render(value:string){
        return <p style={{paddingLeft:0}}>{value}</p>
      }
    },
    {
      name:"绘图数",
      dataIndex:"draw_num",
      key:"draw_num",
      render(value:string){
        return <p>{value}</p>
      }
    },
    {
      name:"绘图容量",
      dataIndex:"draw_capacity",
      key:"draw_capacity",
      render(value:string){
        return <p>{value}</p>
      }
    }
  ]
  const updatePage = (v:number|string)=>{
    dispatch(queryAsync(v))
  }

  return (
    <div className={styles.table}>
        <TableGrid column={column} data={list} page_no={page_no} total_page={total_page} updatePage={updatePage} min_height={636}/>    
    </div>
  );
}

export default Table;
