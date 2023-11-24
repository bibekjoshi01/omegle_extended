import styles from "./HomePage.module.scss";
import Hero from "../HeroSection/index";
import Features from "../Features";
import FAQs from "../FAQs";
import React from 'react';
const Index = () => {  
  return (
    <div className={styles.main}>
      <Hero />
      <Features />
      <FAQs />
    </div>
  );
};

export default Index;
