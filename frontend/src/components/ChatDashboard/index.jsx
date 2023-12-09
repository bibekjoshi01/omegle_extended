import React, { useRef, useCallback, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./ChatDashboard.module.scss";
import {
  getRoomInfo,
  getUserMessages,
  sendMessages,
  disconnectUser,
  updateUserStatus,
} from "../Starter/redux/thunk";
import { useDispatch, useSelector } from "react-redux";
import { starterSelector } from "../Starter/redux/selector";
import { setStatus } from "../Starter/redux/starterSlice";
import { updateStatusHelper } from "../../utils/functions/dataFetch";
import { useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import userIcon from "../../assets/male.png";
import logo from "../../assets/brand.png";
import formatTimestamp from "../../utils/functions/timestamp";

const ChatDashboard = () => {
  // defined hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  // custom states
  const [msg, setMsg] = useState("");
  const [disconnected, setDisconnected] = useState(false);
  const { roomId, status, isSearching, isNext, messages, roomInfo } =
    useSelector(starterSelector);
  const usersData = JSON.parse(localStorage.getItem("userData"));

  // Getting Another UserInfo
  const currentUserId = usersData?.userId;
  let anotherUserNickName;

  if (roomInfo?.member1_id === currentUserId) {
    anotherUserNickName = roomInfo?.member2_nickname;
  } else {
    anotherUserNickName = roomInfo?.member1_nickname;
  }

  // Function to scroll to the bottom of the messages when a new message is received
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMsgChange = (e) => {
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
        scrollToBottom();
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
        // console.log(response);
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error, "error while sending messages");
      });
  };

  const handleEndChat = (e) => {
    e.preventDefault();
    dispatch(disconnectUser(roomId))
      .unwrap()
      .then((response) => {
        setDisconnected((prevDisconnected) => true);
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error, "error while disconnecting !");
      });
  };

  // const updateStatus = useCallback(
  //   (roomId) => {
  //     const dynamicDispatchCreateStarter = updateStatusHelper(
  //       dispatch,
  //       navigate
  //     );
  //     dynamicDispatchCreateStarter(roomId);
  //   },
  //   [dispatch, navigate]
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!disconnected) {
        dispatch(getRoomInfo(roomId));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [roomId, dispatch]);

  // get user message on every 5s interval
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("hello", disconnected, roomInfo?.status);
      if (roomInfo?.status.toLowerCase() === "ended") {
        setDisconnected(true);
      }
      if (roomId && !disconnected) {
        dispatch(getUserMessages(roomId));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [roomId, dispatch, roomInfo?.status]);

  // useEffect hook to scroll to the bottom when component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFindNext = () => {
    navigate("/start-searching");
    window.location.reload();
  };

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
  //   {/* <div className={styles.videoCall} ref={videoCall}></div> */}

  return (
    <div className={styles.body}>
      <section className={styles.msger}>
        <header className={styles["msger-header"]}>
          <div className={styles.logo}>
            <img src={logo} alt="userIcon" className={styles.siteLogo} />
          </div>
          <div className={styles.joinedUser}>
            <img src={userIcon} alt="userIcon" className={styles.userIcon} />
            {anotherUserNickName}
          </div>
          <div className={styles.navs}>
            {disconnected ? (
              <button className={styles.btn} onClick={handleFindNext}>
                Find Next
              </button>
            ) : (
              <button
                className={`${styles.btn} ${styles.endBtn}`}
                onClick={handleEndChat}
              >
                End
              </button>
            )}
          </div>
        </header>

        <main className={styles["msger-chat"]}>
          <h1>{`${anotherUserNickName} joined the chat.`}</h1>
          {messages?.payload?.messages?.map((message, index) => (
            <div className={styles.messages} key={index}>
              {message?.initiator === usersData.userId ? (
                <div className={`${styles.msg} ${styles["right-msg"]}`}>
                  <div className={styles["msg-bubble"]}>
                    <div className={styles["msg-text"]}>{message?.message}</div>
                    <div className={styles["msg-time"]}>
                      {formatTimestamp(message?.timestamp)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${styles.msg} ${styles["left-msg"]}`}>
                  <div className={styles["msg-bubble"]}>
                    <div className={styles["msg-text"]}>{message?.message}</div>
                    <div className={styles["msg-time"]}>
                      {formatTimestamp(message?.timestamp)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        {!disconnected ? (
          <form className={styles["msger-inputarea"]} autoComplete="off">
            <input
              type="text"
              className={styles["msger-input"]}
              placeholder="Type your message..."
              value={msg}
              onChange={handleMsgChange}
              onKeyDown={handleKeyDown}
            />
            <FaHeart className={styles.heart} onClick={handleSendEmogi} />
          </form>
        ) : (
          <div className={styles.disconnected}>
            <p>You are Disconnected !</p>{" "}
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatDashboard;
