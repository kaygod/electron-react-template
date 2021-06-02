import React from 'react';
import style from './index.scss';

type defaultProps = {
 value:string|number
};

const ctrlBtn = (props: defaultProps) => {
  let {
    value=1
  } = props;
  let widthStyle ={
    width: value+'%'
  }
  return (
    <div className={style.flexLeft}>
      <div className={style.progress}>
        <div className={style.progressed} style = {widthStyle}></div>
      </div>
      <div className={style.text}>{value+'%'}</div>
    </div>
  );
};

export default ctrlBtn;
