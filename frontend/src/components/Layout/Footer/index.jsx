import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../../assets/brand.png";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <hr className={styles.separator} />
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.texts}>
            <div>
              <p>Company</p>
              <p>About</p>
            </div>
            <div>
              <p>Support</p>
              <p>Contact Us</p>
            </div>
            <div>
              <p>Legal</p>
              <p>Privacy policy</p>
            </div>
          </div>
        </div> 

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Zingo.com. All Rights Reserved.
          </div>
          <div className={styles.icons}>
            <span><FaXTwitter /></span>
            <span><FaLinkedin /></span>
            <span><FaYoutube /></span>
            <span><FaInstagramSquare /></span>
            <span><FaFacebookSquare /></span>
            <span><FaDiscord /></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
