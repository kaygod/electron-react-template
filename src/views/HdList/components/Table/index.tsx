import React,{useState} from 'react';
import styles from "./index.scss";
import TableGrid from "components/TableGrid/index";

const Table = () => {

  const column = [
    {
      name:"硬盘",
      dataIndex:"hard_disk",
      key:"hard_disk",
      render(value:string){
        return <p>{value}</p>
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

  const [tableData,setTable] = useState({
    page_no:1,
    total_page:2
  })

  const updatePage = ()=>{}


  return (
    <div className={styles.table}>
        <TableGrid column={column} page_no={tableData.page_no} total_page={tableData.total_page} updatePage={updatePage}/>
    </div>
  );
}

export default Table;
