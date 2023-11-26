import React, { useEffect, useState } from 'react';
import styles from './Searching.module.scss';
import { useDispatch } from 'react-redux';
import { createStarter, findPartners } from '../Starter/redux/thunk';
import { RiUserSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Searching = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [status, setStatus] = useState('');
	const [roomId, setRoomId] = useState('');
	const usersData = JSON.parse(localStorage.getItem('userData'));

	const handleSearch = () => {
		const value = {
			user_id: Math.floor(Math.random() * 10),
			nickname: usersData.nickName,
			gender: usersData.usersGender.toUpperCase(),
			interested_gender: usersData.interestedGender.toUpperCase(),
		};
		dispatch(createStarter(value))
			.unwrap()
			.then(({ payload }) => {
				if (payload?.status === 'MATCHED') {
					navigation('/chat-dashboard');
				}
				setRoomId(payload?.room_id)
				findPartnerRecursively(payload?.room_id);
				
			})
			.catch((error) => {
				console.log(error, 'error');
			});
	};

	function findPartnerRecursively(roomId) {
		if (status !== 'MATCHED') {
			dispatch(findPartners(roomId))
				.unwrap()
				.then(({ payload }) => {
					setStatus(payload?.status);
				})
				.catch((error) => {
					console.log(error, 'error');
				});
		}
	}

	useEffect(() => {
		if (status !== 'MATCHED' && status !== '') {
				findPartnerRecursively(roomId);
		}
}, [status]);

	return (
		<div className={styles.main}>
			<p className={styles.usersName}>Hii {usersData?.nickName} !! </p>
			<button onClick={handleSearch} className={styles.searchingPage}>
				Start Searching <RiUserSearchLine />
			</button>
		</div>
	);
};
export default Searching;
