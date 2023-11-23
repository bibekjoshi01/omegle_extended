import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../../assets/brand.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  console.log(scrolled, 'scrolled')

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
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <img src={logo} alt="Zingo" className={styles.logo} />
      <a href="/" className={styles.talkBtn}>
        Talk To Strangers
      </a>
    </div>
  );
};

export default Header;
