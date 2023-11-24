import React from 'react';
import styles from './Searching.module.scss';
import { useDispatch } from 'react-redux';
import { createStarter } from '../Starter/redux/thunk';
const Searching = () => {
	const dispatch = useDispatch();

	const handleSearch = () => {
		const usersData = JSON.parse(localStorage.getItem('userData'));

		const value = {
			user_id: Math.floor(Math.random() * 10),
			nickname: usersData.nickName,
			gender: usersData.usersGender.toUpperCase(),
			interested_gender: usersData.interestedGender.toUpperCase(),
		};
		dispatch(createStarter(value));
	};
	return (
		<div className={styles.main}>
			<button onClick={handleSearch} className={styles.searchingPage}>
				Start Searching
			</button>
		</div>
	);
};

export default Searching;
