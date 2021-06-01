import React, { ReactElement } from 'react';
import styles from "./index.scss";

type defaultProps = {
  children:ReactElement
}

const Layout = (props:defaultProps) => {
  return (
    <div className={styles.layOut}>
          {props.children}
    </div>
  );
}

export default Layout;
