import React, { useState } from "react";
import styles from "./ContactUs.module.scss";
import banner from "../../assets/contactUs.jpg";
import { FaArrowRight } from "react-icons/fa6";

const ContactUs = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  //   console.log(userData);
  return (
    <div className={styles.main}>
      <section className={styles.contactBanner}>
        <h2>#Let's_Talk</h2>
        <p>LEAVE A MESSAGE WE LOVE TO HEAR FROM YOU!</p>
      </section>

      <div className={styles.container}>
        <div className={styles.left}>
          <img src={banner} alt="banner" />
        </div>
        <form className={styles.right}>
          <h1>Contact Us</h1>
          <div className={styles.input}>
            {/* <label htmlFor="name">Name</label> */}
            <input
              type="text"
              name="name"
              placeholder="Name.."
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              name="email"
              placeholder="Email.."
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            {/* <label htmlFor="message">Message</label> */}
            <textarea
              type="text"
              name="message"
              placeholder="Message.."
              onChange={handleChange}
            />
          </div>
          <button className={styles.submit}>
            Submit <FaArrowRight />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
