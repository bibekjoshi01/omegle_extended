import React from "react";
import banner from "../../assets/banner.jpg";
import styles from "./HeroSection.module.scss";
const index = () => {
  return (
    <section className={styles.main}>
      <div>
        <h1 className={styles.heading}>Talk To Strangers</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={banner} alt="Banner" className={styles.banner} />
        </div>
        <div className={styles.right}>
          <h1>Chat Online</h1>
          <p className={styles.description}>
            Omegle is a Great Spot to meet people online. Where a stranger can
            Initiate Video Conversation with another stranger at random over the
            internet using webcam. Download Omegle App for mobile, Start
            chatting instantly without Registration.
          </p>
          <a href=" " className={styles.talkBtn}>
            Talk To Strangers
          </a>
        </div>
      </div>
    </section>
  );
};

export default index;
