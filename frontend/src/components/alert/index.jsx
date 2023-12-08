import React from "react";
import styles from "./Alert.module.scss";
const Alert = () => {
  return (
    <div class={`${styles.alert} ${styles.dark}`} >
            This is alert
    </div>
  );
};

export default Alert;
