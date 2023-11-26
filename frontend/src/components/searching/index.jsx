import React, { useCallback, useEffect, useState } from 'react';
import styles from './Searching.module.scss';
import { useDispatch } from 'react-redux';
import { createStarter, updateUserStatus } from '../Starter/redux/thunk';
import { RiUserSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Searching = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const usersData = JSON.parse(localStorage.getItem('userData'));
	let userStatus = localStorage.getItem('status');
	const roomId = localStorage.getItem('roomId');
	console.log(typeof userStatus, userStatus);

	const handleSearch = () => {
		const value = {
			user_id: usersData?.userId,
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
				localStorage.setItem('status', payload?.status);
				localStorage.setItem('roomId', payload?.room_id);
			})
			.catch((error) => {
				console.log(error, 'error');
			});
	};

	const updateStatus = useCallback(
		(roomId) => {
			dispatch(updateUserStatus(roomId))
				.unwrap()
				.then(({ payload }) => {
					if (payload?.status === 'MATCHED') {
						navigation('/chat-dashboard');
					}
					localStorage.setItem('status', payload?.status);
				})
				.catch((error) => {
					console.log(error, 'error');
				});
		},
		[dispatch]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (
				userStatus === 'WAITING' ||
				userStatus === 'MATCHED' ||
				userStatus === 'DISCONNECTED'
			) {
				updateStatus(roomId);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [userStatus, roomId, updateStatus]);

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
