import React, { useEffect } from 'react';
import styles from "./index.scss";
import SelectBox from "components/SelectBox/index";
import CtrlBtn from "components/CtrlBtn/index"
import { queryAsync, getter, updateKey,updateKeyList } from 'store/reducers/SwitchKey';
import { stopAsync,updatePage } from 'store/reducers/Home';
import { queryUpdateKey,getter as globalGetter } from 'store/reducers/Global';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Confirm } from 'util/common'
import { KEY_FARM_IS_REQUIRED, POOL_KEY_IS_REQUIRED, COMFIRM_UPDATE_KEY } from 'util/constants'
import { useHistory } from 'react-router'

  const SwitchKey = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const prop = useSelector(getter)
  const globalProp = useSelector(globalGetter)
  const {list,key} = prop
  let {chia_key} = globalProp

  useEffect(()=>{
    dispatch(queryAsync())
    if(chia_key!=null){
      dispatch(updateKey({key_name:'farmar_keys',value:chia_key.farmar_keys}))
      dispatch(updateKey({key_name:'pool_keys',value:chia_key.pool_keys}))
    }
  },[])

  const farmKey=(v:string)=>{
    dispatch(updateKey({key_name:'farmar_keys',value:v}))
  }
  const poolKey=(v:string)=>{
    dispatch(updateKey({key_name:'pool_keys',value:v}))
  }
  const onChange = (v:{farmar_keys:string,pool_keys:string})=>{
    dispatch(updateKey({key_name:'farmar_keys',value:v.farmar_keys}))
    dispatch(updateKey({key_name:'pool_keys',value:v.pool_keys}))
  }
  const comfirm = ()=>{
    if(!key.farmar_keys){
      Alert(KEY_FARM_IS_REQUIRED)
      return
    }else if(!key.pool_keys){
      Alert(POOL_KEY_IS_REQUIRED)
      return
    }else{
      Confirm(COMFIRM_UPDATE_KEY).then(async ()=>{
        dispatch(stopAsync())
       const suc =await dispatch(queryUpdateKey(key))
       if(suc){
         dispatch(updatePage(1))
        history.replace('/')
       }
      }).catch(()=>{
        return
      })
    }
  }
  return (
    <div  className={styles.switchKey}>
        <div className={styles.mid_box}>
            <div className={styles.allText}>
               <div className={styles.title}>请选择您的P盘公钥</div>
               <div className={styles.choice}>
                 <SelectBox 
                  titleAlwayShow={true} 
                  title="farm key" 
                  value={key.farmar_keys} 
                  ableInput={true} 
                  placeHold="请选择/输入farm key"
                  list={list} 
                  dragShowName="farmar_keys" 
                  inputChange={(v)=>farmKey(v)}
                  onChange={(v)=>onChange(v)}
                 />
                 </div>
               <div className={styles.choice}>
                 <SelectBox 
                  ableDrag={false}
                  titleAlwayShow={true}
                  title="pool key"
                  value={key.pool_keys}
                  ableInput={true} 
                  placeHold="请选择/输入pool key" 
                  inputChange={(v)=>poolKey(v)}/></div>
                 <div>
                    <div className={styles.btn+' '+styles.flexCenter} onClick={()=>{
                      comfirm()
                    }}>确认</div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default SwitchKey;
                                             