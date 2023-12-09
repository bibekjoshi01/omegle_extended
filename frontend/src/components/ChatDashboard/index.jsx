import React, { useCallback, useEffect, useState } from "react";
import { FaCamera, FaImage, FaMicrophone, FaHeart } from "react-icons/fa";
import styles from "./ChatDashboard.module.scss";
import Time from "./time";
import {
  getRoomInfo,
  getUserMessages,
  sendMessages,
  updateUserStatus,
} from "../Starter/redux/thunk";
import { useDispatch, useSelector } from "react-redux";
import { starterSelector } from "../Starter/redux/selector";
import { setStatus } from "../Starter/redux/starterSlice";
import { updateStatusHelper } from "../../utils/functions/dataFetch";
import { useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const ChatDashboard = () => {
  // defined hooks
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { roomId, status, isSearching, isNext, messages, roomInfo } =
    useSelector(starterSelector);

  const usersData = JSON.parse(localStorage.getItem("userData"));
  const [msg, setMsg] = useState("");

  // Getting Another UserInfo
  const currentUserId = usersData.userId;
  let anotherUserNickName;

  if (roomInfo?.member1_id === currentUserId) {
    anotherUserNickName = roomInfo?.member2_nickname;
  } else {
    anotherUserNickName = roomInfo?.member1_nickname;
  }

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const values = {
      room_id: roomId,
      initiator_id: usersData?.userId,
      message: msg,
    };
    dispatch(sendMessages(values))
      .unwrap()
      .then((response) => {
        setMsg("");
        dispatch(getUserMessages(roomId));
      })
      .catch((error) => {
        console.log(error, "error while sending messages");
      });
  };

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setMsg("");
      handleSend(e);
    }
  };

  const handleSendEmogi = (e) => {
    e.preventDefault();
    const values = {
      room_id: roomId,
      initiator_id: usersData?.userId,
      message: "❤️",
    };
    dispatch(sendMessages(values))
      .unwrap()
      .then((response) => {
        dispatch(getUserMessages(roomId));
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "error while sending messages");
      });
  };

  const updateStatus = useCallback(
    (roomId) => {
      const dynamicDispatchCreateStarter = updateStatusHelper(
        dispatch,
        navigation
      );
      dynamicDispatchCreateStarter(roomId);
    },
    [dispatch]
  );

  // get status of user on each 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSearching && status) {
        updateStatus(roomId);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status, isSearching, roomId, updateStatus]);

  // get user message on every 5s interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSearching && roomId && !isNext) {
        dispatch(getUserMessages(roomId));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [roomId, isSearching, dispatch, isNext]);

  // get room info
  useEffect(() => {
    dispatch(getRoomInfo(roomId));
  }, [dispatch]);

  // const videoCall = async (element) => {
  //   const appId = 2100704118;
  //   const serverSecret = "3880a26f11161f280762b065f0f8e211";
  //   const kit = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //     appId,
  //     serverSecret,
  //     roomId,
  //     Date.now().toString(),
  //     usersData?.nickName
  //   );

  //   const zc = ZegoUIKitPrebuilt.create(kit);
  //   if (zc) {
  //     zc.joinRoom({
  //       container: element,
  //       scenario: {
  //         mode: ZegoUIKitPrebuilt.OneONoneCall,
  //       },
  //       showPreJoinView: false,
  //       showScreenSharingButton: false,
  //       showTurnOffRemoteCameraButton: false,
  //       showTextChat: false,
  //       showUserList: false,
  //       showRoomDetailsButton: false,
  //       showLeavingView: false,
  //       showAudioVideoSettingsButton: false,
  //       turnOnCameraWhenJoining: true,
  //       showMyMicrophoneToggleButton: true,
  //       showMyCameraToggleButton: false,
  //       lowerLeftNotification: {
  //         showUserJoinAndLeave: false,
  //         showTextChat: false,
  //       },
  //       layout: "Grid",
  //     });
  //   } else {
  //     console.error(
  //       "ZegoUIKitPrebuilt is undefined. Cannot initiate video call."
  //     );
  //   }
  // };

  return (
    <>
      {/* <div className={styles.videoCall} ref={videoCall}></div> */}

      <div className={styles.main}>
        <div className={styles.msgArea}>
          <p className={styles.joinedNotification}>
            {`${anotherUserNickName} joined the chat.`}
          </p>

          {messages?.payload?.messages?.map((message, index) => {
            return (
              <div className={styles.messages} key={index}>
                {message?.initiator == usersData.userId ? (
                  <div className={`${styles.msgBox} ${styles.outgoingMsg}`}>
                    {message?.message}
                  </div>
                ) : (
                  <div className={`${styles.msgBox} ${styles.incomingMsg}`}>
                    {message?.message}
                  </div>
                )}
              </div>
            );
          })}

          <form className={styles.form} autoComplete="off">
            <div className={styles.row}>
              <textarea
                name="inputMsg"
                className={styles.inputMsg}
                placeholder="Type a message..."
                autoFocus
                value={msg}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className={styles.send}
                onClick={handleSend}
                disabled={!msg.trim()}
              >
                Send
              </button>
              <FaHeart className={styles.heart} onClick={handleSendEmogi} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;
