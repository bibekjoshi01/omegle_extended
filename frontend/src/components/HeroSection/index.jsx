import React from "react";
import banner from "../../assets/banner.jpg";
import styles from "./HeroSection.module.scss";
import { FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleTalkToStrangers = () => {
    const hasUserData = JSON.parse(localStorage.getItem("userData"));
    if (hasUserData) {
      navigate("/start-searching");
    } else {
      navigate("/starter");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <h1>
          <span className={styles.title}>ZINGO:</span> Chat with anyone &
          anywhere.
        </h1>
        <div className={styles.description}>
          <p>
            More than an app; it's the doorway to a world of friendships waiting
            to be discovered. Start chatting, start connecting, start your Zingo
            journey today!
          </p>
        </div>
        <div className={styles.btn}>
          <button className={styles.talkBtn} onClick={handleTalkToStrangers}>
            <FaVideo className={styles.icon} />{" "}
            <span className={styles.btnText}>Talk To Strangers</span>{" "}
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <img src={banner} alt="Banner" className={styles.banner} />
      </div>
    </section>
  );
};

export default HeroSection;
