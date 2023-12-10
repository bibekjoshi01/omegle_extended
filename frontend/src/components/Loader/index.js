import React from "react";
import styles from "./Loader.module.scss";
import logo from '../../assets/brand.png'
const Loader = () => {
  return (
    <div className={styles.main}>
        <div className={styles.logo}>
            <img src={logo} alt="Zingo" />
        </div>
      <div className={styles.loader}>
        <div className={styles.bubble}>
          <div className={styles["bubble__shine bubble__shine--lg"]}></div>
          <div className={styles["bubble__shine bubble__shine--sm"]}></div>
        </div>
        <p className={styles.text}>
          Lo<span className={styles["text__highlight"]}>a</span>din
          <span className={styles["text__highlight"]}>g</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
