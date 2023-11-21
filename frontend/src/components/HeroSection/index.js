import React from "react";
import banner from "../../assets/banner.png";
import styles from "./HeroSection.module.scss";
import Header from "../Header/index";
const index = () => {
  return (
    <>
      <Header />
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.left}>
            <h1>Chat With Anyone & Anywhere</h1>
            <p className={styles.description}>
              Google Meet is one service for secure, high-quality video meetings
              and calls available for everyone, on any device.
            </p>
            <a href=" " className={styles.talkBtn}>
              Talk To Strangers
            </a>
          </div>
          <div className={styles.right}>
            <img src={banner} alt="Banner" className={styles.banner} />
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
