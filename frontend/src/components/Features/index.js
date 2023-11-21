import React from "react";
import styles from "./Features.module.scss";

function Features() {
  const featuresData = [
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/chat-app.svg",
      title: "Talk To Strangers",
      description:
        "The Internet is full of amazing people, Omegle lets you chat with them.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/video-chat.svg",
      title: "Text and Video Chat",
      description:
        "The Internet is full of amazing people, Omegle lets you chat with them.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/student.svg",
      title: "Interact with College Students",
      description:
        "Using college email address Omegle lets you meet other college students.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/chat-app.svg",
      title: "Talk To Strangers",
      description:
        "The Internet is full of amazing people, Omegle lets you chat with them.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/video-chat.svg",
      title: "Text and Video Chat",
      description:
        "The Internet is full of amazing people, Omegle lets you chat with them.",
    },
    {
      icon: "https://omegle.uk.com/omegle.uk.com/assets/icons/student.svg",
      title: "Interact with College Students",
      description:
        "Using college email address Omegle lets you meet other college students.",
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
