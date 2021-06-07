import React, { useEffect } from 'react';
import styles from "./index.scss";
import SelectBox from "components/SelectBox/index";
import CtrlBtn from "components/CtrlBtn/index"
import { queryAsync, getter, updateKey,updateKeyList } from 'store/reducers/SwitchKey';
import { stopAsync } from 'store/reducers/home';
import { queryUpdateKey,getter as globalGetter } from 'store/reducers/Global';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Confirm } from 'util/common'
import { KEY_FARM_IS_REQUIRED, POOL_KEY_IS_REQUIRED, COMFIRM_UPDATE_KEY } from 'util/constants'

const SwitchKey = () => {
  const dispatch = useDispatch()
  const prop = useSelector(getter)
  const globalProp = useSelector(globalGetter)
  const {list,key} = prop
  let {chia_key} = globalProp

  useEffect(()=>{
    dispatch(queryAsync())
    if(chia_key!=null){
      dispatch(updateKey({key_name:'farm_key',value:chia_key.farm_key}))
      dispatch(updateKey({key_name:'pool_key',value:chia_key.pool_key}))
    }
  },[])

  const farmKey=(v:string)=>{
    dispatch(updateKey({key_name:'farm_key',value:v}))
  }
  const poolKey=(v:string)=>{
    dispatch(updateKey({key_name:'pool_key',value:v}))
  }
  const onChange = (v:{farm_key:string,pool_key:string})=>{
    dispatch(updateKey({key_name:'farm_key',value:v.farm_key}))
    dispatch(updateKey({key_name:'pool_key',value:v.pool_key}))
  }
  const comfirm = ()=>{
    if(!key.farm_key){
      Alert(KEY_FARM_IS_REQUIRED)
      return
    }else if(!key.pool_key){
      Alert(POOL_KEY_IS_REQUIRED)
      return
    }else{
      Confirm(COMFIRM_UPDATE_KEY).then(()=>{
        dispatch(stopAsync())
      dispatch(queryUpdateKey(key))
      }).catch(()=>{
        return
      })
    }
  }
  return (
    <div  className={styles.switchkey}>
        <div className={styles.mid_box}>
            <div className={styles.alltext}>
               <div className={styles.title}>请选择您的P盘公钥</div>
               <div className={styles.choice}>
                 <SelectBox 
                  titleAlwayShow={true} 
                  title="farm key" 
                  value={key.farm_key} 
                  ableInput={true} 
                  placeHold="请选择/输入farm key"
                  list={list} 
                  dragShowName="farm_key" 
                  inputChange={(v)=>farmKey(v)}
                  onChange={(v)=>onChange(v)}
                 />
                 </div>
               <div className={styles.choice}>
                 <SelectBox 
                  ableDrag={false}
                  titleAlwayShow={true}
                  title="pool key"
                  value={key.pool_key}
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
