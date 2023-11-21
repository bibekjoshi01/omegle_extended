import React, { useRef, useState } from "react";
import styles from "./FAQ.module.scss";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
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
  const caretRef = useRef();

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    const caret = caretRef.current;
    if(caret){
      caret.style.transform = expandedIndex === index ? "rotate(0deg)" : "rotate(180deg)";
    }
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
              <FaAngleDown className={styles.caret} ref={caretRef}/>
              {/* {expandedIndex === index ? <FaAngleUp className={styles.caret}/> : <FaAngleDown className={styles.caret}/>} */}
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
