import React,{useEffect} from 'react';
import Header from "./components/Header/index"
import ChooseBox from "./components/ChooseBox/index"
import Table from "./components/Table/index"
import styles from "./index.scss";
import { useSelector, useDispatch } from 'react-redux'
import { getter as globalGetter,updateSwitchFlag } from "store/reducers/Global";
import { useHistory } from "react-router";

const Home = () => {

  const { chia_key,has_switch } = useSelector(globalGetter);

  const history = useHistory();

  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(chia_key == null && has_switch === false){
      history.replace("/update_key");
      dispatch(updateSwitchFlag(true));
    }
  },[])

  return (
    <div className={styles.home}>
      <Header/>
      <ChooseBox/>
      <Table/>
    </div>
  );
};

export default Home;
