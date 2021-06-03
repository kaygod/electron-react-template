import React,{useState} from 'react';
import styles from "./index.scss";
import TableGrid from "components/TableGrid/index"
import StatusSize from "./components/StatusSize/index"
const Table = () => {
    const column = [
        {
            name:'编号', 
            dataIndex:"num",
            key:"num",
            className:'text_padding20',
            render(value:string){
                return <p style={{textAlign:'left',paddingLeft:'25px'}}>{value}</p>
            }
        },
        {
            name:'K的大小', 
            dataIndex:"k_value",
            key:"k_value",
            className:'text_left',
            render(value:string){
                return <p style={{textAlign:'left'}}>{value}</p>
            }
        },
        {
            name:'文件名', 
            dataIndex:"file_name",
            key:"file_name",
            className:'text_left',
            render(value:string){
                return <p style={{textAlign:'left'}}>{value}</p>
            }
        },
        {
            name:'状态', 
            dataIndex:"status",
            key:"status",
            className:'text_left',
            render(value:string){
                return <StatusSize value={value} />
            }
        }
      ]
      const [tableData,setTable] = useState({
        page_no:1,
        total_page:11
      })
    const updatePage = (v)=>{
        setTable({page_no:v,total_page:11})
    }
    let data=[
        {
            num:'01',
            k_value:'K-32,101.4GiB',
            file_name:'文件名',
            status:10
        },
        {
            num:'20',
            k_value:'K-32,101.4GiB',
            file_name:'文件名',
            status:30
        },
        {
            num:'200',
            k_value:'K-32,101.4GiB',
            file_name:'文件名',
            status:50
        },
        {
            num:'2000',
            k_value:'K-32,101.4GiB',
            file_name:'文件名',
            status:90
        }
    ]
  return (
    <div>
      <TableGrid column={column} data={data} page_no={tableData.page_no} total_page={tableData.total_page} updatePage={updatePage}  min_height={479}/>     
    </div>
  );
};

export default Table;
