import React from "react";
import banner from "../../assets/banner.jpg";
import styles from "./HeroSection.module.scss";

const index = () => {
  return (
    <>
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.left}>
            <h1>ZINGO: Chat with anyone & anywhere.</h1>
            <p className={styles.description}>
              Say goodbye to limitations and hello to a new era of universal
              connectivity. Join the revolution now!
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
