import React,{useEffect,useState} from 'react';
import TableGrid from "components/TableGrid/index"
import StatusSize from "./components/StatusSize/index"
import { useSelector,useDispatch } from 'react-redux'
import { getter,getMachineDataAsync,deleteAsync,deletebatchAsync } from "store/reducers/Home";
import { getter as globalGetter } from "store/reducers/Global";
import { Confirm } from 'util/common';
import {CONFIRM_DELETE} from 'util/constants';
import style from './index.scss';

const Table = () => {

    const [check_all,set_check] =useState(false)
    const [checkArr,setCheckArr] = useState<any[]>([])
    
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
    const k_value_list = [
        {name:'K-32,101.4GiB',value:'k32'},
        {name:'K-33,208.8GiB',value:'k33'},
        {name:'K-34,429.8GiB',value:'k34'},
        {name:'K-35,884.1GiB',value:'k35'}
    ]
    const k_filter =(value:string)=>{    
       const item= k_value_list.find(val=>{
            return val.value==value
       })
       if(item){
         return item.name
       }else{
           return value;
       }
    }
    const item_chack=(ob:any) =>{
        const arr = JSON.parse(JSON.stringify(checkArr))
       const index = arr.indexOf(ob.id)
        if(index==-1){
            arr.push(ob.id)
        }else{
            arr.splice(index,1)
        }
        if(arr.length>=10){
            set_check(true)
        }else{
            set_check(false)
        }
        setCheckArr(arr)

    }
    const check_all_fun =(bool:boolean) =>{
        let arr:any = []
        set_check(bool)
        if(bool){
            arr = list.map((val:any)=>{
                return val.id
            })
        }
        setCheckArr(arr)
    }
    const deletebatch = ()=>{
        console.log(checkArr)
        Confirm(CONFIRM_DELETE).then(res=>{
            if(res){
                dispatch(deletebatchAsync(checkArr))
            }
        }).catch(res=>{

        })
    }
    const checkbox = ()=>{
        return <div className={`${style.deleteBox} ${style.inp}`}>
            <input className={style.inp} type="checkbox" checked={check_all} onChange={()=>check_all_fun(!check_all)} />
            <div onClick={()=>{deletebatch()}}>删除</div>
        </div>
    }
    const is_check = (ob:any)=>{
        return checkArr.includes(ob.id)
    }
   
    let column = [
        type=='2'&&{
            name:
            checkbox(), 
            dataIndex:"check",
            key:"check",
            className:'',
            render(value:string,ob:Object,index:number){
                return <p  className={`${style.inp} ${style.deleteItem}`}><input checked={is_check(ob)} type="checkbox" onChange={(e)=>{item_chack(ob)}} /></p>
            }
        },
        {
            name:'编号', 
            dataIndex:"code",
            key:"code",
            width:120,
            className:'text_padding20',
            render(value:string,ob:Object,index:number){
                return <p style={{textAlign:'left',paddingLeft:'25px'}}>{value}</p>
            }
        },
        {
            name:'K的大小', 
            dataIndex:"k_value",
            key:"k_value",
            width:150,
            className:'text_left',
            render(value:string){
                return <p style={{textAlign:'left'}}>{k_filter(value)}</p>
            }
        },
        type=='2'&&{
            name:'文件名', 
            dataIndex:"file_name",
            key:"file_name",
            className:'text_left',
            render(value:string){
                return <p style={{textAlign:'left',paddingRight:'30px'}} title={value}>{value}</p>
            }
        },
        {
            name:'状态', 
            dataIndex:"status",
            key:"status",
            width:150,
            className:'text_left',
            render(value:string){
                return <StatusSize value={value} />
            }
        },
        type=='2'&&{
            name:'操作', 
            dataIndex:"operval",
            key:"operval",
            width:50,
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
       setCheckArr([])
       set_check(false)
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
