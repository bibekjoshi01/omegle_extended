import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import styles from './Starter.module.scss';
import male from '../../assets/male.png';
import female from '../../assets/female.png';
import { useNavigate } from 'react-router-dom';
const Starter = () => {
	const [step, setStep] = useState(1);
	const navigation = useNavigate()
	const [usersData, setUsersData] = useState({
		usersGender: '',
		interestedGender: '',
		nickName: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUsersData({
			...usersData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('userData', JSON.stringify(usersData));
		navigation('/start-searching')
	};

	const handleStepChange = (event, nextStep) => {
		event.preventDefault();
		setStep(nextStep);
	};

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
						<p>I am {usersData.usersGender || '...'}</p>
						<div className={styles.options}>
							<div
								className={styles.option}
								onClick={() =>
									handleChange({
										target: {
											name: 'usersGender',
											value: 'male',
										},
									})
								}>
								<img
									src={male}
									alt="male"
									name="usersGender"
									className={`${
										usersData.usersGender === 'male'
											? styles.opacity
											: ''
									}`}
								/>
								Male
							</div>
							<div
								className={styles.option}
								onClick={() =>
									handleChange({
										target: {
											name: 'usersGender',
											value: 'female',
										},
									})
								}>
								<img
									src={female}
									alt="female"
									name="usersGender"
									className={`${
										usersData.usersGender === 'female'
											? styles.opacity
											: ''
									}`}
								/>
								Female
							</div>
						</div>
					</div>
				);

			case 2:
				return (
					<div className={styles.input}>
						<p>
							Interested In {usersData.interestedGender || '...'}
						</p>
						<div className={styles.options}>
							<div
								className={styles.option}
								onClick={() =>
									handleChange({
										target: {
											name: 'interestedGender',
											value: 'male',
										},
									})
								}>
								<img
									src={male}
									alt="male"
									name="interestedGender"
									className={`${
										usersData.interestedGender === 'male'
											? styles.opacity
											: ''
									}`}
								/>
								Male
							</div>
							<div
								className={styles.option}
								onClick={() =>
									handleChange({
										target: {
											name: 'interestedGender',
											value: 'female',
										},
									})
								}>
								<img
									src={female}
									alt="female"
									name="interestedGender"
									className={`${
										usersData.interestedGender === 'female'
											? styles.opacity
											: ''
									}`}
								/>
								Female
							</div>
						</div>
					</div>
				);

			case 3:
				return (
					<div className={styles.name}>
						<label htmlFor="nickName">Your Nickname</label>
						<input
							type="text"
							name="nickName"
							placeholder="Your nick name.."
							onChange={handleChange}
							value={usersData.nickName}
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
							className={`${styles.btn}`}
							onClick={(e) => handleStepChange(e, step - 1)}>
							<FaArrowLeft /> Back
						</button>
					)}

					{step < 3 && (
						<button
							className={`${styles.btn} ${
								isNextDisabled() ? styles.disabled : ''
							}`}
							onClick={(e) => handleStepChange(e, step + 1)}
							disabled={isNextDisabled()}>
							Next <FaArrowRight />
						</button>
					)}

					{step === 3 && (
						<button
							className={`${styles.submit} ${
								isNextDisabled() ? styles.disabled : ''
							}`}
							type="submit"
							onClick={handleSubmit}
							disabled={isNextDisabled()}>
							Enter Chat <FaArrowRight />
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Starter;
