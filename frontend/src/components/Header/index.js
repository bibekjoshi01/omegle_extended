import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.jpeg";

const index = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="ZingoLogo" className={styles.logo} />
      <a href=" " className={styles.talkBtn}>
        Talk To Strangers
      </a>
    </div>
  );
};

export default index;
