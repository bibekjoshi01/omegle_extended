import React, { useCallback, useEffect, useState } from 'react';
import { FaCamera, FaImage, FaMicrophone, FaHeart } from 'react-icons/fa';
import styles from './ChatDashboard.module.scss';
import Time from './time';
import {
	getUserMessages,
	sendMessages,
	updateUserStatus,
} from '../Starter/redux/thunk';
import { useDispatch } from 'react-redux';
// import userIcon from "../../assets/male.png";
const ChatDashboard = () => {
	const userStatus = localStorage.getItem('status');
	const usersData = JSON.parse(localStorage.getItem('userData'));
	const roomId = localStorage.getItem('roomId');
	const dispatch = useDispatch();
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
			}).catch((error)=>{
        console.log(error, 'error while sending messages')
      });
	};

	const updateStatus = useCallback(
		(roomId) => {
			dispatch(updateUserStatus(roomId))
				.unwrap()
				.then(({ payload }) => {
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
			if (userStatus !== '') {
				updateStatus(roomId);
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [userStatus, roomId, updateStatus]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (roomId) {
				dispatch(getUserMessages(roomId));
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [roomId, dispatch]);
	return (
		<>
			{/* <div className={styles.joinedUser}>
        <img src={userIcon} alt="userIcon" className={styles.userIcon} />
        Manish
      </div> */}
			<div className={styles.main}>
				<div className={styles.msgArea}>
					<p className={styles.joinedNotification}>
						Manish joined the chat.
					</p>
					<div className={styles.messages}>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							Hi <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							Hello <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							What are you doing <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							just chilling <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							what about you <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							me too.. <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							i have written a song for you <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							oh wow <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							Hum tere bin ab reh nahi sakte Tere bina kya wajood
							mera Hum tere bin ab reh nahi sakte Tere bina kya
							wajood mera Tujhse juda gar ho jaayenge Toh khud se
							hi ho jaayenge judaa Kyunki tum hi ho Ab tum hi ho
							Zindagi ab tum hi ho Chain bhi, mera dard bhi Meri
							aashiqui ab tum hi ho Read more at:
							https://www.highclap.com/tum-hi-ho-lyrics-aashiqui-2-arijit-singh/{' '}
							<Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							Tera mera rishta hai kaisa Ik pal door gawara nahi
							Tere liye har roz hai jeete Tujh ko diya mera waqt
							sabhi Koi lamha mera na ho tere bina Har saans pe
							naam tera Kyunki tum hi ho Ab tum hi ho Zindagi ab
							tum hi ho Chain bhi, mera dard bhi Meri aashiqui ab
							tum hi ho Read more at:
							https://www.highclap.com/tum-hi-ho-lyrics-aashiqui-2-arijit-singh/{' '}
							<Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							your lyrics are soo good <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							thank you <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.incomingMsg}`}>
							wlc <Time />
						</div>
						<div
							className={`${styles.msgBox} ${styles.outgoingMsg}`}>
							Bye, see you <Time />
						</div>

						{/* PUT Chat Here  */}
					</div>
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
							<button
								className={styles.send}
								onClick={handleSend}>
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
