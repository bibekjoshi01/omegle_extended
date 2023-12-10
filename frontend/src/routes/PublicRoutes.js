import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { starterSelector } from "../components/Starter/redux/selector";
import Loader from "../components/Loader";
const HomePage = React.lazy(()=>import("../components/HomePage"));
const Starter = React.lazy(()=>import("../components/Starter"));
const ContactUs = React.lazy(()=>import("../components/ContactUs"));
const Searching = React.lazy(()=>import("../components/searching"));
const ChatDashboard = React.lazy(()=>import("../components/ChatDashboard"));
const PageNotFound = React.lazy(()=>import("../components/PageNotFound"));

const AppRoutes = () => {
  const { roomId } = useSelector(starterSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/chat-dashboard" && roomId === null) {
      navigate("/starter");
    }
  }, [roomId, navigate]);


  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loader/>}> <HomePage /> </Suspense>} />
      <Route path="/starter" element={<Suspense fallback={<Loader/>}> <Starter /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<Loader/>}> <ContactUs /></Suspense>} />
      <Route path="/start-searching" element={<Suspense fallback={<Loader/>}> <Searching /></Suspense>} />
      <Route path="/chat-dashboard" element={<Suspense fallback={<Loader/>}> <ChatDashboard /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<Loader/>}> <PageNotFound /></Suspense>} />
    </Routes>
  );
};

export default AppRoutes;
