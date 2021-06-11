import React, { useState, useRef, useEffect, forwardRef } from 'react';
import Grid, { selectType } from 'components/Table/index';
import Page from 'components/Page/index';
import styles from './index.scss';

type defaultProps = {
  column: any[];
  data?: any[];
  emptyTips:string,
  page_no: number;
  total_page: number;
  updatePage: (num: number) => void;
  onSelect?: (data: selectType) => void;
  min_height:number;
};

const Table = forwardRef((props: defaultProps, ref) => {
  const {
    column,
    data = [],
    page_no,
    total_page,
    updatePage,
    onSelect,
    min_height,
    emptyTips="暂无数据"
  } = props;

  return (
    <div className={styles.allpage} style={{minHeight:min_height+'px'}}>
      <Grid column={column} data={data} onSelect={onSelect} ref={ref} />
      {
          !data.length&&
            <div className={styles.emptyTips}>{emptyTips}</div>
        }
      <div className={styles.bottom}>
        <Page
          page_no={page_no}
          total_page={total_page}
          updatePage={updatePage}
        />
      </div>
    </div>
  );
});

export default Table;
