import React, { useState } from 'react';
import { call } from '../../util/common';
import { useSelector } from 'react-redux'
import { getter } from "store/reducers/Global";
import styles from "./index.scss";

const Hello = () => {

  const data = useSelector(getter);

  console.log(data);

  const [list, setList] = useState([]);

  const getSystem = async () => {
    const data = (await call('getSystem')) as [];
    setList(data);
  };

  return (
    <div className="home">
      <button onClick={getSystem}>Click me</button>
      <div>
        {list.map((item: [string, string][], index: number) => {
          return (
            <div className="line" key={index}>
              <p className="first-column">{item[0]}:</p>
              <p className="second-column">{item[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hello;
