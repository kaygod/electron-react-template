import React, { useEffect } from 'react';
import styles from './index.scss';
import SelectBox from 'components/SelectBox/index';

import { queryAsync, getter, updateKey } from 'store/reducers/SwitchKey';

import { queryUpdateKey, getter as globalGetter } from 'store/reducers/Global';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Confirm } from 'util/common';
import { ENSURE_ENTER } from 'util/constants';
import { useHistory } from 'react-router';

const PageOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const prop = useSelector(getter);
  const { key } = prop;

  useEffect(() => {
    dispatch(queryAsync());
  }, []);

  const onUpdate = (v: string) => {
    dispatch(updateKey({ key_name: 'pool_keys', value: v }));
  };

  const comfirm = () => {
    Confirm(ENSURE_ENTER)
      .then(async () => {
        const suc = await dispatch(queryUpdateKey(key));
        if (suc) {
          history.replace('/two');
        }
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className={styles.switchKey}>
      <div className={styles.mid_box}>
        <div className={styles.allText}>
          <div className={styles.title}>请输入您的密钥</div>
          <div className={styles.choice}>
            <SelectBox
              ableDrag={false}
              titleAlwayShow={true}
              title="secrete key"
              value={key.pool_keys}
              ableInput={true}
              placeHold="请输入密钥"
              inputChange={(v) => onUpdate(v)}
            />
          </div>
          <div>
            <div
              className={styles.btn + ' ' + styles.flexCenter}
              onClick={() => {
                comfirm();
              }}
            >
              确认
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
