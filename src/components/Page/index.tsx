import React, { ReactElement } from 'react';
import styles from './index.scss';

type updatePageType = (page_no: number) => void;

type defaultProps = {
  page_no: number; //当前页
  total_page: number; //总页码
  updatePage: updatePageType;
};

const pageList = ({
  total_page,
  start,
  page_no,
  updatePage,
}: {
  total_page: number;
  start: number;
  page_no: number;
  updatePage: updatePageType;
}) => {
  const content: ReactElement[] = [];

  //页码跳转
  const jump = (jump_page: number) => {
    if (jump_page === page_no) {
      return;
    }
    updatePage(jump_page);
  };

  Array.from(Array(total_page)).forEach((v, index) => {
    content.push(
      <div
        className={`${styles.cube} ${index + start === page_no ? styles.active : ''}`}
        onClick={() => {
          jump(index + start);
        }}
      >
        {index + start}
      </div>
    );
  });
  return content;
};

/**
 * 渲染左侧
 */
const renderLeft = (page_no: number, updatePage: updatePageType) => {
  if (page_no == 1) {
    return null;
  } else {
    return (
      <div
        className={styles.cube}
        style={{width:'60px'}}
        onClick={() => {
          updatePage(page_no - 1);
        }}
      >
        &lt; 上一页
      </div>
    );
  }
};

/**
 * 渲染右侧
 */
const renderRight = (
  page_no: number,
  total_page: number,
  updatePage: updatePageType
) => {
  // 最后一页
  if (page_no === total_page) {
    return null;
  }

  return (
    <>
      {total_page>10&&<div className={styles.cube}>...</div>}
      <div
        className={styles.cube}
        style={{width:'60px'}}
        onClick={() => {
          updatePage(page_no + 1);
        }}
      >
        下一页 &gt;
      </div>
    </>
  );
};

/**
 * 获取页码内容
 * @param page_no
 * @param total_page
 */
const getContent = (
  page_no: number,
  total_page: number,
  updatePage: updatePageType
) => {
  let content;

  //总页码小于1,直接隐藏
  if (total_page <= 1) {
    return null;
  }
  //总页码<=9
  else if (total_page <= 10) {
    content = pageList({ total_page, start: 1, page_no, updatePage });
  }
  //当前页码>=1且<=4
  else if (page_no >= 1 && page_no <= 4) {
    content = pageList({ total_page: 9, start: 1, page_no, updatePage });
  }
  //当前页码处于倒数5页之类
  else if (page_no >= total_page - 4) {
    const start = total_page - 8;
    content = pageList({ total_page: 9, start, page_no, updatePage });
  }
  //其他情况
  else {
    const start = page_no - 3;
    content = pageList({ total_page: 9, start, page_no, updatePage });
  }

  return content;
};

const Page = (props: defaultProps) => {
  const { page_no, total_page, updatePage } = props;

  let content = getContent(page_no, total_page, updatePage);

  if (content == null) {
    return null;
  }

  return (
    <div className={styles.page}>
      {page_no!=1&&<span className={styles.cube} style={{width:'44px'}} onClick={() => { updatePage(1); }}>首页</span>}
      {renderLeft(page_no, updatePage)}
      {content.map((item, index) => {
        return <span key={index}>{item}</span>;
      })}
      {renderRight(page_no, total_page, updatePage)}
      {page_no!=total_page&&<span className={styles.cube} style={{width:'44px'}} onClick={() => { updatePage(total_page); }}>尾页</span>}
    </div>
  );
};

export default Page;
