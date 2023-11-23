import React from "react";
import styles from "./HomePage.module.scss";
import Hero from "../HeroSection/index";
import Features from "../Features";
import FAQs from "../FAQs";

const index = () => {
  return (
    <div className={styles.main}>
      <Hero />
      <Features />
      <FAQs />
    </div>
  );
};

export default index;
