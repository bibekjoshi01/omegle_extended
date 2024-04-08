import React from "react";
import styles from "./Features.module.scss";
import Lottie from "lottie-react";

// import chatAppIcon from "../../assets/chat_app.svg";
// import videoChatIcon from "../../assets/video_chat.svg";
// import studentIcon from "../../assets/student.svg";
// import peoplesIcon from "../../assets/peoples.png";
import lottieAnimation1 from "../../assets/Animation1.json";
import lottieAnimation2 from "../../assets/Animation2.json";
import lottieAnimation3 from "../../assets/Animation3.json";
import lottieAnimation4 from "../../assets/Animation4.json";

function Features() {
  const featuresData = [
    {
      icon: lottieAnimation1,
      title: "Chat Across Continents",
      description:
        "Connect with intriguing individuals worldwide and let the magic of chat bring new friendships to life.",
      borderColor: "#e3cdfa",
      backgroundColor: "rgb(250, 245, 255)",
    },
    {
      icon: lottieAnimation3,
      title: "See Beyond Words",
      description:
        "Connect not just through words but with the power of face-to-face conversations.",
      borderColor: "rgba(106, 127, 255, 0.2)",
      backgroundColor: "rgb(245, 250, 255)",
    },
    {
      icon: lottieAnimation2,
      title: "Zingo Campus: Student Network",
      description:
        "Share experiences, make lasting connections within the vibrant Zingo student community.",
      borderColor: "#b0f5d3",
      backgroundColor: "rgb(243, 255, 250)",
    },
    {
      icon: lottieAnimation4,
      title: "Meet and Chat with New People Instantly",
      description:
        "You can start chatting right away, and you never know who you might meet – someone from your local area, or even someone across the globe!",
      borderColor: "#ffefad",
      backgroundColor: "rgb(255, 252, 240)",
    },
  ];

  return (
    <section className={styles.main}>
      <h1>Born from a passion for uniting the world</h1>
      <p>In the belief that love can blossom from unexpected conversations.</p>
      <div className={styles.column}>
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={styles.card}
            style={{
              border: `1px solid ${feature.borderColor}`,
              backgroundColor: feature.backgroundColor,
            }}
          >
            <div
              className={styles.texts}
              style={{ order: index % 2 === 0 ? 0 : 1 }}
            >
              <h1 className={styles.title}>{feature.title}</h1>
              <p className={styles.description}>{feature.description}</p>
              <div
                className={styles.talkButton}
                style={{
                  border: `1.2px solid ${feature.borderColor}`,
                  backgroundColor: feature.backgroundColor,
                }}
              >
                <div
                  className={styles.circle}
                  style={{
                    backgroundColor: feature.borderColor,
                  }}
                ></div>
                <p>Start Talking</p>
              </div>
            </div>
            <div
              className={styles.image}
              style={{ order: index % 2 === 0 ? 1 : 0 }}
            >
              <Lottie className={styles.lottie} animationData={feature.icon} />
              {/* <img src={feature.icon} alt={`Icon for ${feature.title}`} /> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
