import React from "react";
import styles from "./Features.module.scss";

import chatAppIcon from "../../assets/chat_app.svg";
import videoChatIcon from "../../assets/video_chat.svg";
import studentIcon from "../../assets/student.svg";

function Features() {
  const featuresData = [
    {
      icon: chatAppIcon,
      title: "Chat Across Continents",
      description:
        "Connect with intriguing individuals worldwide and let the magic of chat bring new friendships to life.",
    },
    {
      icon: videoChatIcon,
      title: "See Beyond Words",
      description:
        "Connect not just through words but with the power of face-to-face conversations.",
    },
    {
      icon: studentIcon,
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
