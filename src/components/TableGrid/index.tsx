import React, { useState, useRef, useEffect, forwardRef } from 'react';
import Grid, { selectType } from 'components/Table/index';
import Page from 'components/Page/index';
import styles from './index.scss';

type defaultProps = {
  column: any[];
  data?: any[];
  page_no: number;
  total_page: number;
  updatePage: (num: number) => void;
  onSelect?: (data: selectType) => void;
};

const Table = forwardRef((props: defaultProps, ref) => {
  const {
    column,
    data = [],
    page_no,
    total_page,
    updatePage,
    onSelect,
  } = props;

  return (
    <div>
      <Grid column={column} data={data} onSelect={onSelect} ref={ref} />
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
