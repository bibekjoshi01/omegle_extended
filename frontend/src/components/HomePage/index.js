import React from "react";
import styles from "./HomePage.module.scss";
import Hero from "../HeroSection/index";
import Features from "../Features";
import Footer from "../Footer";

const index = () => {
  return (
    <div className={styles.main}>
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default index;
