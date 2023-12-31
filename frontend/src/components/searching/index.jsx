import React, { useCallback, useEffect } from "react";
import styles from "./Searching.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { starterSelector } from "../Starter/redux/selector";
import { setIsSearching } from "../Starter/redux/starterSlice";
import {
  disconnectUserHelper,
  startSearching,
  updateStatusHelper,
} from "../../utils/functions/dataFetch";

const Searching = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const usersData = JSON.parse(localStorage.getItem("userData"));
  const { roomId, status, loading, isSearching } = useSelector(starterSelector);

  const handleSearch = () => {
    dispatch(setIsSearching(true));

    const value = {
      nickname: usersData.nickName,
      gender: usersData.usersGender.toUpperCase(),
      interested_gender: usersData.interestedGender.toUpperCase(),
    };

    const dynamicDispatchCreateStarter = startSearching(dispatch, navigation);
    dynamicDispatchCreateStarter(value);
  };

  const handleStopSearching = () => {
    const dynamicDisconnectUser = disconnectUserHelper(dispatch);
    dynamicDisconnectUser(roomId);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSearching && status) {
        updateStatus(roomId);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status, roomId, isSearching, updateStatus]);

  return (
    <div className={styles.main}>
      <p className={styles.usersName}>Hii {usersData?.nickName} !! </p>
      {loading && isSearching ? (
        <>
          <button
            onClick={handleStopSearching}
            className={styles.searchingPage}
          >
            stop Searching
          </button>
        </>
      ) : (
        <>
          <button onClick={handleSearch} className={styles.searchingPage}>
            Start Searching <RiUserSearchLine />
          </button>
        </>
      )}
    </div>
  );
};

export default Searching;
