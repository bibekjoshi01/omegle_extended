import React, { useState, useEffect } from "react";
import styles from "./Time.module.scss";

function Time() {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
      return timeString;
    }
    const time = getCurrentTime();
    setCurrentTime(time);

    // const intervalId = setInterval(() => {
    //   const time = getCurrentTime();
    //   setCurrentTime(time);
    // }, 1000);

    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.main}>
      <span className={styles.time}>
        {currentTime}
      </span>
    </div>
  );
}

export default Time;
