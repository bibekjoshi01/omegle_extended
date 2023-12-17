import React from "react";
import styles from "./Loader.module.scss";
const Loader = ({ isInbutton }) => {
  return (
    <div className={`${styles.main} ${isInbutton && styles.inbutton}`}>
      <div className={styles.wrapper}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Loader;
