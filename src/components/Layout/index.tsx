import React, { ReactElement } from 'react';
import styles from "./index.scss";
import CutSwitch from "components/CutSwitch/index"
type defaultProps = {
  children:ReactElement
}

const Layout = (props:defaultProps) => {
  return (
    <div className={styles.layOut}>
      <CutSwitch />
          {props.children}
    </div>
  );
}

export default Layout;
