import React, { useRef, useState, forwardRef } from "react";
import styles from "./FAQ.module.scss";
import { FaAngleDown } from "react-icons/fa";

function FAQ() {
  const faqs = [
    {
      question: "Do I need to sign up to use Zingo?",
      answer:
        "No, Zingo does not necessitate any registration. You can freely use Zingo.com as a guest, engaging in anonymous chat without the need for sign-up.",
    },
    {
      question: "I'm unsure about the safety of using Zingo. Is it secure?",
      answer:
        "Rest assured, Zingo is completely safe to use. You can browse anonymously and engage with others. However, remember that your safety lies in your hands. Avoid disclosing personal information while interacting with strangers on Zingo.",
    },
    {
      question:
        "What options are available for interacting with strangers on Omegle?",
      answer:
        "You have the choice of engaging in conversations through text chat or video chat on the platform.",
    },
    {
      question: "Can Zingo chats be traced?",
      answer:
        "No, Zingo prioritizes user privacy by not saving conversations. Unlike some platforms, Zingo provides a safer space for interaction as it does not expose your conversations to tracing or recording. Nonetheless, it's essential to exercise caution and refrain from sharing personal information online.",
    },
    {
      question: "Is Zingo risky?",
      answer:
        "Zingo carries certain risks, particularly for children. It is advisable for children above 13 to use Zingo under parental supervision. Adults can use Zingo independently but must adhere to the platform's guidelines to minimize risks. Sharing personal information with strangers on Zingo increases the potential for danger, so exercising caution is essential.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  // Use an object to store refs
  const caretRefs = useRef({});

  const toggleAnswer = (index) => {
    const CurrentCaret = caretRefs.current[index];
    const PreviousCaret = caretRefs.current[expandedIndex];
    console.log(PreviousCaret);
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    if (PreviousCaret) {
      PreviousCaret.style.transform =
        expandedIndex === index ? "rotate(-180deg)" : "rotate(0deg)";
      PreviousCaret.style.transition = "0.5s ease-in-out";
      PreviousCaret.parentNode.parentNode.style.borderBottom =
        "1.5px solid #7e7d7d";
      PreviousCaret.parentNode.style.color = "rgb(40, 40, 40)";
    }
    if (CurrentCaret) {
      CurrentCaret.style.transform =
        expandedIndex === index ? "rotate(0deg)" : "rotate(180deg)";
      CurrentCaret.style.transition = "0.5s ease-in-out";
      CurrentCaret.parentNode.parentNode.style.borderBottom =
        "1.5px solid #000";
      CurrentCaret.parentNode.style.color = "#000";
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.faqList}>
        <h1>FAQS</h1>
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
        <FaAngleDown />
      </div>
    </div>
  );
});
