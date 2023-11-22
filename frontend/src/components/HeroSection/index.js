import React from "react";
import banner from "../../assets/banner.jpg";
import styles from "./HeroSection.module.scss";
import { FaVideo } from "react-icons/fa6";

const index = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>
            <span className={styles.title}>ZINGO:</span> Chat with anyone &
            anywhere.
          </h1>
          <div className={styles.description}>
            <p>
              Say goodbye to limitations and hello to a new era of universal
              connectivity. Join the revolution now!
            </p>
          </div>
          <div className={styles.btn}>
            <a href=" " className={styles.talkBtn}>
              <FaVideo className={styles.icon} />{" "}
              <span className={styles.btnText}>Talk To Strangers</span>{" "}
            </a>
          </div>
        </div>
        <div className={styles.right}>
          <img src={banner} alt="Banner" className={styles.banner} />
        </div>
      </div>
    </section>
  );
};

export default index;
