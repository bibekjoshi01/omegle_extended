import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separator} />
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <p>
            &copy;Omegle.uk.com 2021. We are not affiliated with Omegle.com LLC.
          </p>
        </div>
        <div className={styles.right}>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
