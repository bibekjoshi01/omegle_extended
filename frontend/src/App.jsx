import React, { useEffect } from "react";
import Layout from "./components/Layout";
import AppRoutes from "./routes/PublicRoutes";
import useOverflowEffect from "./utils/functions/useOverflowEffect";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { starterSelector } from "./components/Starter/redux/selector";
// import { disconnectUser } from "./components/Starter/redux/thunk";

const App = () => {
  // const dispatch = useDispatch();
  useOverflowEffect(); //to manage overflowing issue
  const navigate = useNavigate();
  // const { roomId } = useSelector(starterSelector);

  const hasUserData = localStorage.getItem("userData");

  // useEffect(() => {
  //   if (roomId !== null) {
  //     window.location.reload(() => {
  //       dispatch(disconnectUser(roomId))
  //         .unwrap()
  //         .catch((error) => {
  //           console.log(error, "error while disconnecting !");
  //         });
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/starter" && hasUserData) {
      navigate("/start-searching");
    } else if (path === "/start-searching" && !hasUserData) {
      navigate("/starter");
    }
  }, [hasUserData, navigate]);

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
