import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separator} />
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <p>
            &copy; {new Date().getFullYear()} Zingo.com. All Rights Reserved.
          </p>
        </div>
        <div className={styles.right}>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
