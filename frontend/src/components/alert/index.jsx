import React, { useState } from "react";
import styles from "./Alert.module.scss";
import { useSelector } from 'react-redux';

const Alert = () => {
  const {showAlert, alertMsg, alertType} = useSelector(state => state.alert);
  
  return (
    <>
      {showAlert && (
        <div className={`${styles.alert} ${styles[alertType]}`}>
          {alertMsg}
        </div>
      )}
    </>
  );
};

export default Alert;
