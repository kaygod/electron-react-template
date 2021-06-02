import React from 'react';
import style from './index.scss';

type defaultProps = {
  labelStart: string;
  labelEnd?: string;
  bgStart?: string
  bgEnd?: string;
  status: Boolean;
  onlyBtn:Boolean;
  onChange?: (v: boolean) => void; // 更新事件
};

const ctrlBtn = (props: defaultProps) => {
  let {
    labelStart = props.status?'切换P盘':(props.labelStart||'开始P盘'),
    labelEnd =  '全部停止',
    status = true,
    bgStart ='#02d7db',
    bgEnd = '#ff614a',
    onlyBtn = false,
    onChange = () => {},
  } = props;
  let bgStartStyle = {
    backgroundColor:bgStart,
    borderWidth:'1px',
    borderColor:bgStart,
    borderStyle:'solid'
  };
  let bgStartEnd = {
    backgroundColor:bgEnd,
    borderWidth:'1px',
    borderColor:bgEnd,
    borderStyle:'solid'
  };
  return (
    <div className={style.flexLeft}>
        <div className={style.btn+' '+style.flexCenter} onClick={()=>{onChange(!status)}} style={bgStartStyle}>{labelStart}</div>
        {
          status&&!onlyBtn&&<div className={style.btn+' '+style.flexCenter} style={bgStartEnd}  onClick={()=>{onChange(false)}}>{labelEnd}</div>
        }     
    </div>
  );
};

export default ctrlBtn;
