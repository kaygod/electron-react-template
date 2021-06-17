import React,{useEffect} from 'react';
import TableGrid from "components/TableGrid/index"
import StatusSize from "./components/StatusSize/index"
import { useSelector,useDispatch } from 'react-redux'
import { getter,getMachineDataAsync,deleteAsync } from "store/reducers/Home";
import { getter as globalGetter } from "store/reducers/Global";
import { Confirm } from 'util/common';
import {CONFIRM_DELETE} from 'util/constants'


const Table = () => {


    const { page_no,total_page,list,type } = useSelector(getter);
    const {chia_key} = useSelector(globalGetter)
    const dispatch = useDispatch();
    const deleteLog = (ob:any)=>{
        const id = ob.id
        Confirm(CONFIRM_DELETE).then(res=>{
            if(res){
                dispatch(deleteAsync(id))
            }
        },err=>{
            console.log(err)
        })
    }
    let column = [
        {
            name:'编号', 
            dataIndex:"code",
            key:"code",
            className:'text_padding20',
            render(value:string,ob:Object,index:number){
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
        type=='2'&&{
            name:'文件名', 
            dataIndex:"file_name",
            key:"file_name",
            className:'text_left',
            render(value:string){
                return <p style={{textAlign:'left'}} title={value}>{value}</p>
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
        },
        type=='2'&&{
            name:'操作', 
            dataIndex:"operval",
            key:"operval",
            className:'text_left',
            render(value:string,ob:Object){
                return <div style={{textAlign:'left'}} onClick={()=>{deleteLog(ob)}}><i className="iconfont icon-shanchu" style={{color:'#ccc'}}></i></div>
            }
        }
    ]
    useEffect(()=>{
        if(chia_key!=null){
         dispatch(getMachineDataAsync());
        }
    },[])
    
    //翻页
    const updatePage = (v:number)=>{
       dispatch(getMachineDataAsync(v));
    }
    column = column.filter((val)=>{
        return val!==false
    })
  return (
    <div>
      <TableGrid column={column} emptyTips="暂无P盘数据" data={list} page_no={page_no} total_page={total_page} updatePage={updatePage} min_height={467}/>
    </div>
  );
};

export default Table;
