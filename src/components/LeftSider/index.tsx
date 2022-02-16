import React, { useState } from 'react';
import styles from './index.scss';
import { useHistory, useLocation } from 'react-router-dom';

const LeftSider = () => {
  const routerList = [
    { path: '/update_key', name: '主页', icon: 'icon-lock' },
    { path: '/two', name: '第二页', icon: 'icon-lock' },
  ];
  const history = useHistory();
  let { pathname } = useLocation();
  return (
    <div className={styles.leftSider}>
      {routerList.map((val, index) => {
        return (
          <div
            key={index}
            className={`${styles.lines} ${
              pathname == val.path ? styles.current : ''
            }`}
            onClick={() => {
              history.push(val.path);
            }}
          >
            <span className={'iconfont ' + val.icon}></span>
            <p>{val.name}</p>{' '}
          </div>
        );
      })}
    </div>
  );
};

export default LeftSider;
