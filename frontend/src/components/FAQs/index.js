import React, { useState } from "react";
import styles from "./FAQ.module.scss";

function FAQ() {
  const faqs = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    // Add more FAQs as needed
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className={styles.main}>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.question}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </div>
            {expandedIndex === index && (
              <p className={styles.answer}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
