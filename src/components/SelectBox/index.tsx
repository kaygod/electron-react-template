import React,{useState} from 'react';
import style from './index.scss';

type defaultProps = {
    list?: any[],
    title:string,
    titleAlwayShow?:boolean,
    ableInput?:boolean,
    placeHold?:string,
    value:string,
    dragShowName?:string,
    inputType?:string,
    ableDrag?:boolean,
    inputChange?:(v: any) => void; // 更新事件
    onChange?: (v: any) => void; // 更新事件
};

const ctrlBtn = (props: defaultProps) => {
    const [dropShow,setdropShow] = useState(false)
  let {
    list,
    title,
    ableInput=false,
    titleAlwayShow=false,
    value,
    inputType='text',
    placeHold='请选择',
    ableDrag = true,
    dragShowName="name",
    inputChange = () => {},
    onChange = () => {},
  } = props;

  const filter = (val:string)=>{
        const item = list.find((item)=>{
            return item.value === val;
        })
        if(item){
            return item[dragShowName];
        }else{
            return placeHold;
        }
  }

  return (
    <div className={style.select}>
        <div className={style.flexLeft+' '+ style.selectBar}>
        <div className={style.containBox}>
                {
                    (titleAlwayShow||value)&&
                    <div className={style.smTitle}>{title}</div>
                }
                {ableInput?
                    <input className={style.in} type={inputType} value={value} placeholder={placeHold} onInput={(e)=>{inputChange(e.currentTarget.value)}}></input>:
                    <div className={style.textShow+' '+style.textEllips}>{filter(value)}</div>
                }
        </div>
        {ableDrag&&<div className={`${style.icon} ${style.flexCenter}`} onClick={()=>{setdropShow(!dropShow)}}>
                <span className="iconfont icon-caret-down"></span>
        </div>}
        </div>
        {
            dropShow&&<div className={style.selectBox}>
            {
                list.map((val)=>{
                    return (
                        <div className={style.selectItem+' '+style.textEllips} onClick={()=>{
                            onChange(val) 
                            setdropShow(false)
                            }}>
                            {val[dragShowName]}
                        </div>
                    )
                })
            }
        </div>}
    </div>
  );
};

export default ctrlBtn;
