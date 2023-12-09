import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../../assets/brand.png";
import { useNavigate } from "react-router-dom";
import userIcon from "../../../assets/male.png";
import { useDispatch, useSelector } from "react-redux";
import { starterSelector } from "../../Starter/redux/selector";
import {
  disconnectUserHelper,
  startSearching,
  updateStatusHelper,
} from "../../../utils/functions/dataFetch";
import { setIsNext, setIsSearching } from "../../Starter/redux/starterSlice";

const Header = ({ pathname }) => {
  // defined hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [scrolled, setScrolled] = useState(false);
  const [showTalkBtn, setShowTalkBtn] = useState(true);

  // selector
  const {
    roomId,
    status,
    roomInfo,
    loading,
    isSearching,
    disconnecting,
    isNext,
  } = useSelector(starterSelector);

  // get users data from localstorage
  const usersData = JSON.parse(localStorage.getItem("userData"));
  
  // Getting Another UserInfo
  const currentUserId = usersData.userId;
  let anotherUserNickName;

  if (roomInfo?.member1_id === currentUserId) {
    anotherUserNickName = roomInfo?.member2_nickname;
  } else {
    anotherUserNickName = roomInfo?.member1_nickname;
  }
  
  const handleTalkToStrangers = () => {
    const hasUserData = JSON.parse(localStorage.getItem("userData"));
    if (hasUserData) {
      navigate("/start-searching");
    } else {
      navigate("/starter");
    }
  };

  //handle next buttton click
  const handleNext = () => {
    const dynamicDisconnectUser = disconnectUserHelper(dispatch);
    dynamicDisconnectUser(roomId);
    dispatch(setIsNext(true));
    const value = {
      user_id: usersData?.userId,
      nickname: usersData.nickName,
      gender: usersData.usersGender.toUpperCase(),
      interested_gender: usersData.interestedGender.toUpperCase(),
    };

    const dynamicDispatchCreateStarter = startSearching(dispatch, navigate);
    dynamicDispatchCreateStarter(value);
  };

  const updateStatus = useCallback(
    (roomId) => {
      const dynamicDispatchCreateStarter = updateStatusHelper(
        dispatch,
        navigate
      );
      dynamicDispatchCreateStarter(roomId);
    },
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSearching && status) {
        updateStatus(roomId);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status, roomId, isSearching, updateStatus]);

  const handleEnd = () => {
    const dynamicDisconnectUser = disconnectUserHelper(dispatch);
    dynamicDisconnectUser(roomId);
  };

  useEffect(() => {
    setShowTalkBtn(
      pathname === "/chat-dashboard" ||
        pathname === "/start-searching" ||
        pathname === "/starter"
    );
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="/">
        <img src={logo} alt="Zingo" className={styles.logo} />
      </a>

      {pathname === "/chat-dashboard" && (
        <div className={styles.joinedUser}>
          <img src={userIcon} alt="userIcon" className={styles.userIcon} />
          {anotherUserNickName}
        </div>
      )}

      {!showTalkBtn && (
        <button
          href="/starter"
          className={styles.talkBtn}
          onClick={handleTalkToStrangers}
        >
          Talk To Strangers
        </button>
      )}

      {pathname === "/chat-dashboard" && (
        <div className={styles.buttons}>
          <button className={styles.talkBtn} onClick={handleNext}>
            {loading && isNext ? "searching..." : "Next"}
          </button>
          <button
            className={`${styles.talkBtn} ${styles.endBtn}`}
            onClick={handleEnd}
          >
            {disconnecting ? "disconnecting..." : "End"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
