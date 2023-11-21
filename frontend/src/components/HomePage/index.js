import React from "react";
import styles from "./HomePage.module.scss";
import Hero from "../HeroSection/index";
import Features from "../Features";
import Footer from "../Footer";
import FAQs from "../FAQs";

const index = () => {
  return (
    <div className={styles.main}>
      <Hero />
      <Features />
      <FAQs />
      <Footer />
    </div>
  );
};

export default index;
