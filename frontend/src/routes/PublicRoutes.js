import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../components/HomePage";
import Starter from "../components/Starter";
import ContactUs from "../components/ContactUs";
import Searching from "../components/searching";
import ChatDashboard from "../components/ChatDashboard";
import PageNotFound from "../components/PageNotFound";
import { starterSelector } from "../components/Starter/redux/selector";

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
      <Route path="/" element={<HomePage />} />
      <Route path="/starter" element={<Starter />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/start-searching" element={<Searching />} />
      <Route path="/chat-dashboard" element={<ChatDashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
