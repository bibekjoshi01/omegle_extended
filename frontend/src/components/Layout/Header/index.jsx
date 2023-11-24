import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../../assets/brand.png";
import { useNavigate } from "react-router-dom";

const Header = ({ pathname }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showTalkBtn, setShowTalkBtn] = useState(true);
  const navigation = useNavigate();

  const handleTalkToStrangers = () =>{
    const hasData = JSON.parse(localStorage.getItem('userData'))
    if(hasData){
      navigation("/start-searching")
    }else{
      navigation('/starter')
    }
  }
  const handleNext = ()=>{
    //handle next buttton click
  }
  useEffect(() => {
    setShowTalkBtn(
      pathname === "/chat-dashboard" ||
        pathname === "/start-searching" ||
        pathname === "/starter"
    );
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="/">
        <img src={logo} alt="Zingo" className={styles.logo} />
      </a>
      {!showTalkBtn && (
        <button
          href="/starter"
          className={styles.talkBtn}
          onClick={handleTalkToStrangers}
        >
          Talk To Strangers
        </button>
      )}
      {
        (pathname==='/chat-dashboard') &&
        (<div className={styles.buttons}><button
          className={styles.talkBtn}
          onClick={handleNext}
        >
          Next
        </button>
        <button
          className={`${styles.talkBtn} ${styles.endBtn}`}
          onClick={handleNext}
        >
          End
        </button>
        </div>)
      }
    </div>
  );
};

export default Header;
