import React from "react";
import styles from "./Features.module.scss";

function Features() {
  const featuresData = [
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/chat-app.svg",
      title: "Chat Across Continents",
      description:
        "Connect with intriguing individuals worldwide and let the magic of chat bring new friendships to life.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/video-chat.svg",
      title: "See Beyond Words",
      description:
        "Connect not just through words but with the power of face-to-face conversations.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/student.svg",
      title: "Zingo Campus: Student Network",
      description:
        "Share experiences, make lasting connections within the vibrant Zingo student community.",
    },
  ];

  return (
    <section className={styles.main}>
      <div className={styles.grid}>
        {featuresData.map((feature, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>
              <img src={feature.icon} alt={`Icon for ${feature.title}`} />
            </div>
            <h2 className={styles.title}>{feature.title}</h2>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
