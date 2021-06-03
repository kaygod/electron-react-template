import React,{useEffect} from 'react';
import TableGrid from "components/TableGrid/index"
import StatusSize from "./components/StatusSize/index"
import { useSelector,useDispatch } from 'react-redux'
import { getter,getMachineDataAsync } from "store/reducers/Home";


const Table = () => {


    const { page_no,total_page,list } = useSelector(getter);
    
    const dispatch = useDispatch();

    const column = [
        {
            name:'编号', 
            dataIndex:"num",
            key:"num",
            className:'text_padding20',
            render(value:string,ob:Object,index:number){
                return <p style={{textAlign:'left',paddingLeft:'25px'}}>{index+1}</p>
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

    useEffect(()=>{
        dispatch(getMachineDataAsync());
    },[])
    
    //翻页
    const updatePage = (v:number)=>{
       dispatch(getMachineDataAsync(v));
    }

  return (
    <div>
      <TableGrid column={column} data={list} page_no={page_no} total_page={total_page} updatePage={updatePage} min_height={479}/>
    </div>
  );
};

export default Table;
