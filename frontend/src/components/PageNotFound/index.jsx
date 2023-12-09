import React from "react";
import styles from "./PageNotFound.module.scss";
import { Link } from "react-router-dom"; // Assuming you use React Router

function PageNotFound() {
  return (
    <section className={styles.main}>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for might be unavailable.</p>
        <Link to="/" className={styles["back-to-home-btn"]}>
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
