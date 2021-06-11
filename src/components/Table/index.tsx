import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './index.scss';
import custome_styles from "./custome.scss";

export type selectType = { [key: string]: string };

type defaulProps = {
  column: any[];
  data: any[];
  onSelect?: (data: selectType) => void;
};

type obType = { [key: string]: { index: number; parent_index: number } };

/**
 * 初始化处理数据
 */
const resolveData = ({
  filter_data,
  setFilters,
  column,
}: {
  filter_data: obType;
  setFilters: React.Dispatch<React.SetStateAction<obType>>;
  column: any;
}) => {
  const ob: obType = {};
  column.forEach((item: any, parent_index: number) => {
    if (item.filters) {
      ob[item.key] = {
        index: 0,
        parent_index,
      };
    }
  });
  setFilters(ob);
};

/**
 * 渲染下拉框
 */
const renderSelect = ({
  filters,
  key,
  filter_data,
  setFilters,
  onSelect,
}: {
  onSelect: Function;
  filter_data: obType;
  key: string;
  filters: any[];
  setFilters: React.Dispatch<React.SetStateAction<obType>>;
}) => {
  if (!Array.isArray(filters) || filters.length == 0) {
    return null;
  }
  /**
   * 选择某一项
   */
  const selItem = (idx: number) => {
    const data = {
      ...filter_data,
      [key]: {
        ...filter_data[key],
        index: idx,
      },
    };
    setFilters(data);
    if (onSelect) {
      onSelect(data);
    }
  };

  const { index } = filter_data[key];

  return (
    <div className={styles.parentContainer}>
      <p>
        {filters[index].name}
        <span>▾</span>
      </p>
      <ul className={styles.select}>
        {filters.map((item, idx) => {
          return (
            <li
              onClick={() => {
                selItem(idx);
              }}
              className={styles.li}
              key={idx}
            >
              {idx == 0 ? '全部' : item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * 获取勾选的数据
 */
const getSelectData = (data: obType, column: any[]) => {
  const result = Object.create(null);

  const keys = Object.keys(data);

  keys.forEach((key_name) => {
    const { index, parent_index } = data[key_name];
    result[key_name] = column[parent_index].filters[index].value;
  });

  return result;
};

/**
 * 初始化勾选数据
 */
const initFilterData = (column: any[]) => {
  const ob = Object.create(null);
  column.forEach((item, index) => {
    const { filters, key } = item;
    if (filters) {
      ob[key] = {
        index: 0,
        parent_index: index,
      };
    }
  });
  return ob;
};

const Table = forwardRef((props: defaulProps, ref) => {
  const { column, data} = props;

  const [filter_data, setFilters] = useState<obType>(initFilterData(column));

  const onSelect = (data: obType) => {
    if (props.onSelect) {
      props.onSelect(getSelectData(data, column));
    }
  };

  //初始化数据
  useEffect(() => {
    resolveData({
      filter_data,
      setFilters,
      column,
    });
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getSelectData: () => {
        return getSelectData(filter_data, column);
      },
    };
  });

  if (column.length == 0) {
    return null;
  }

  return (
    <table className={styles.table}>
      <colgroup>
        {column.map((item) => {
          if (item.width) {
            return <col key={item.key} width={`${item.width}px`} />;
          } else {
            return <col key={item.key} />;
          }
        })}
      </colgroup>
      <thead>
        <tr className={styles.thead_tr}>
          {column.map((item) => {
            const cus_styles = custome_styles as any;
            return (
              <th key={item.key} className={`${styles.th} ${item.className?cus_styles[item.className]:cus_styles.default}`}>
                {item.filters
                  ? renderSelect({ ...item, filter_data, setFilters, onSelect })
                  : item.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tbody}>    
        {data.map((item, index) => {
          return (
            <tr key={index} className={styles.tr}>
              {column.map((child) => {
                return (
                  <td className={styles.grid} key={child.key}>
                    {child.render(item[child.dataIndex], item, index)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default Table;
