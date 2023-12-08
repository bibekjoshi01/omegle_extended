import React from "react";
import banner from "../../assets/banner.jpg";
import styles from "./HeroSection.module.scss";
import { FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlertMsg } from "../alert/redux/alertSlice";

const HeroSection = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleTalkToStrangers = () =>{
    const hasData = JSON.parse(localStorage.getItem('userData'));
    dispatch(showAlertMsg({
      showAlert: true,
      alertMsg: "Start Searching Now",
      alertType: "info",
    }));

    if(hasData){
      navigation("/start-searching")
    }else{
      navigation('/starter')
    }
  }
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <h1>
          <span className={styles.title}>ZINGO:</span> Chat with anyone &
          anywhere.
        </h1>
        <div className={styles.description}>
          <p>
            More than an app; it's the doorway to a world of friendships
            waiting to be discovered. Start chatting, start connecting, start
            your Zingo journey today!
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
