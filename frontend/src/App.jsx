import Home from "./components/HomePage";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Starter from "./components/Starter";
import ContactUs from "./components/ContactUs";
import { Routes, Route, useNavigate } from "react-router-dom";
import Searching from "./components/searching";
import ChatDashboard from "./components/ChatDashboard";
import PageNotFound from "./components/PageNotFound";
import useOverflowEffect from "./utils/functions/useOverflowEffect";
import { useEffect } from "react";

const App = () => {
  const hasUserData = localStorage.getItem("userData");
  useOverflowEffect(); //to manage overflowing issue
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL path is "/starter" and user data is present
    const path = window.location.pathname;
    if (path === "/starter" && hasUserData) {
      // Redirect to another route (e.g., "/start-searching")
      navigate("/start-searching");
    } else if (path === "/start-searching" && !hasUserData) {
      navigate("/starter");
    }
  }, [hasUserData, navigate]);

  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/starter" element={<Starter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/start-searching" element={<Searching />} />
          <Route path="/chat-dashboard" element={<ChatDashboard />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
