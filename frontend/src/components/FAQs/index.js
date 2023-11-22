import React, { useRef, useState, forwardRef } from "react";
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

  // Use an object to store refs
  const caretRefs = useRef({});

  const toggleAnswer = (index) => {
    const CurrentCaret = caretRefs.current[index];
    const PreviousCaret = caretRefs.current[expandedIndex];
    console.log(PreviousCaret);
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    if(PreviousCaret){
      PreviousCaret.style.transform = expandedIndex===index ?"rotate(-180deg)":"rotate(0deg)";
      PreviousCaret.style.transition = "0.2s ease-in";
    }
    if (CurrentCaret) {
      CurrentCaret.style.transform =expandedIndex===index ? "rotate(0deg)":"rotate(180deg)";
      CurrentCaret.style.transition ="0.2s ease-in";
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
              <Question
                ref={(el) => (caretRefs.current[index] = el)}
                question={faq.question}
              />
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

const Question = forwardRef((props, ref) => {
  return (
    <div>
      {props.question}
      <div ref={ref} className={styles.caret}>
        <FaAngleDown className={styles.caret} />
      </div>
    </div>
  );
});
