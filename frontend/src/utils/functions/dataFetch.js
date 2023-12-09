import {
  setIsNext,
  setIsSearching,
  setRoomId,
  setStatus,
} from "../../components/Starter/redux/starterSlice";
import {
  createStarter,
  disconnectUser,
  updateUserStatus,
} from "../../components/Starter/redux/thunk";

// start searching
export const startSearching = (dispatch, navigation) => (value) => {
  dispatch(createStarter(value))
    .unwrap()
    .then(({ payload }) => {
      if (payload?.status === "MATCHED") {
        navigation("/chat-dashboard");
        dispatch(setIsNext(false));
      }
      dispatch(setIsSearching(true));
      dispatch(setRoomId(payload?.room_id));
      dispatch(setStatus(payload?.status));

      const existingUserData = {
        ...(JSON.parse(localStorage.getItem("userData")) || {}),
        userId: payload?.user_id,
      };

      localStorage.setItem("userData", JSON.stringify(existingUserData));
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

// update user status
export const updateStatusHelper = (dispatch, navigation) => (roomId) => {
  dispatch(updateUserStatus(roomId))
    .unwrap()
    .then(({ payload }) => {
      if (payload?.status === "MATCHED") {
        navigation("/chat-dashboard");
        dispatch(setIsNext(false));
      } else if (payload?.status !== "ENDED") {
        dispatch(setIsSearching(true));
        dispatch(setStatus(payload?.status));
      } else {
        dispatch(setIsSearching(false));
        dispatch(setStatus(payload?.status));
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

// disconnect user
export const disconnectUserHelper = (dispatch) => (roomId) => {
  dispatch(disconnectUser(roomId))
    .unwrap()
    .then(({ payload }) => {
      dispatch(setIsSearching(false));
    })
    .catch((error) => console.log(error, "disconnect error!"));
};
