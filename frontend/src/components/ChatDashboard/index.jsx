import React, { useCallback, useEffect, useState } from 'react';
import { FaCamera, FaImage, FaMicrophone, FaHeart } from 'react-icons/fa';
import styles from './ChatDashboard.module.scss';
import Time from './time';
import { getUserMessages, sendMessages, updateUserStatus } from '../Starter/redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { starterSelector } from '../Starter/redux/selector';
import { setStatus } from '../Starter/redux/starterSlice';
import { updateStatusHelper } from '../../utils/functions/dataFetch';
import { useNavigate } from 'react-router-dom';
// import userIcon from "../../assets/male.png";
const ChatDashboard = () => {
	// defined hooks
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const { roomId, status, isSearching, isNext, messages } = useSelector(starterSelector);
	console.log(messages, 'messages');
	const usersData = JSON.parse(localStorage.getItem('userData'));
	const [msg, setMsg] = useState('');

	const handleChange = (e) => {
		setMsg(e.target.value);
	};
	const handleSend = (e) => {
		e.preventDefault();
		const values = {
			room_id: roomId,
			initiator: usersData?.userId,
			message: msg,
		};
		dispatch(sendMessages(values))
			.unwrap()
			.then((res) => {
				setMsg('');
			})
			.catch((error) => {
				console.log(error, 'error while sending messages');
			});
	};

	const updateStatus = useCallback(
		(roomId) => {
			const dynamicDispatchCreateStarter = updateStatusHelper(dispatch, navigation);
			dynamicDispatchCreateStarter(roomId);
		},
		[dispatch]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isSearching && status) {
				updateStatus(roomId);
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [status, isSearching, roomId, updateStatus]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isSearching && roomId && !isNext) {
				dispatch(getUserMessages(roomId));
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [roomId, isSearching, dispatch, isNext]);
	return (
		<>
			{/* <div className={styles.joinedUser}>
        <img src={userIcon} alt="userIcon" className={styles.userIcon} />
        Manish
      </div> */}
			<div className={styles.main}>
				<div className={styles.msgArea}>
					<p className={styles.joinedNotification}>Manish joined the chat.</p>
					{messages?.payload?.messages?.map((message, index) => {
						return (
							<div className={styles.messages} key={index}>
								{message?.initiator == usersData.userId ? (
									<div className={`${styles.msgBox} ${styles.outgoingMsg}`}>
										{message?.message} <Time />
									</div>
								) : (
									<div className={`${styles.msgBox} ${styles.incomingMsg}`}>
										{message?.message} <Time />
									</div>
								)}
							</div>
						);
					})}
					<form className={styles.form} autoComplete="off">
						<div className={styles.row}>
							<div className={styles.icons}>
								<FaCamera />
								<FaImage />
								<FaMicrophone />
							</div>
							<textarea
								name="inputMsg"
								className={styles.inputMsg}
								placeholder="Type a message..."
								autoFocus
								value={msg}
								onChange={handleChange}
							/>
							<button className={styles.send} onClick={handleSend}>
								Send
							</button>
							<FaHeart className={styles.heart} />
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChatDashboard;
