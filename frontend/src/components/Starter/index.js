import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./Starter.module.scss";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

const Starter = () => {
  const [step, setStep] = useState(1);

  const [usersData, setUsersData] = useState({
    usersGender: "",
    interestedGender: "",
    nickName: "",
  });

  const handleChange = (e) => {
    const { name, alt, value } = e.target;

    setUsersData({
      ...usersData,
      [name]: alt || value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(usersData));
    console.log("User data submitted:", JSON.parse(localStorage.getItem("userData")));
  };

  const handleStepChange = (nextStep) => {
    setStep(nextStep);
  };

  console.log(usersData);

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !usersData.usersGender;
      case 2:
        return !usersData.interestedGender;
      case 3:
        return !usersData.nickName;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.input}>
            <p>Your are...</p>
            <div className={styles.options}>
              <div
                className={styles.option}
                onClick={() =>
                  handleChange({
                    target: { name: "usersGender", value: "male" },
                  })
                }
              >
                <img
                  src={male}
                  alt="male"
                  name="usersGender"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    opacity: usersData.usersGender === "male" ? 1 : 0.7,
                  }}
                />
                Male
              </div>
              <div
                className={styles.option}
                onClick={() =>
                  handleChange({
                    target: { name: "usersGender", value: "female" },
                  })
                }
              >
                <img
                  src={female}
                  alt="female"
                  name="usersGender"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    opacity: usersData.usersGender === "female" ? 1 : 0.7,
                  }}
                />
                Female
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.input}>
            <p>Interested In...</p>
            <div className={styles.options}>
              <div
                className={styles.option}
                onClick={() =>
                  handleChange({
                    target: { name: "interestedGender", value: "male" },
                  })
                }
              >
                <img
                  src={male}
                  alt="male"
                  name="interestedGender"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    opacity: usersData.interestedGender === "male" ? 1 : 0.7,
                  }}
                />
                Male
              </div>
              <div
                className={styles.option}
                onClick={() =>
                  handleChange({
                    target: { name: "interestedGender", value: "female" },
                  })
                }
              >
                <img
                  src={female}
                  alt="female"
                  name="interestedGender"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    opacity: usersData.interestedGender === "female" ? 1 : 0.7,
                  }}
                />
                Female
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.name}>
            <label htmlFor="nickName">Your nick Name..</label>
            <input
              type="text"
              name="nickName"
              placeholder="Your nick name.."
              onChange={handleChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.main}>
      <p>Step {step}/3</p>
      <form className={styles.form}>
        {renderStepContent()}

        <div className={styles.buttons}>
          {step > 1 && (
            <button
              className={styles.btn}
              onClick={() => handleStepChange(step - 1)}
            >
              <FaArrowLeft /> Back
            </button>
          )}

          {step < 3 && (
            <button
              className={styles.btn}
              onClick={() => handleStepChange(step + 1)}
              disabled={isNextDisabled()}
              style={{ opacity: isNextDisabled() ? 0.4 : 1 }}
            >
              Next <FaArrowRight />
            </button>
          )}

          {step === 3 && (
            <button
              className={styles.submit}
              type="submit"
              onClick={handleSubmit}
              disabled={isNextDisabled()}
              style={{ opacity: isNextDisabled() ? 0.4 : 1 }}
            >
              Start Talking <FaArrowRight />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Starter;
