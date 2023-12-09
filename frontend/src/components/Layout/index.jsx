import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Index({ children }) {
  const [isInChat, setIsInChat] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsInChat(pathname === "/chat-dashboard");
  }, [pathname]);

  return (
    <>
      {!isInChat && <Header pathname={pathname} />}
      {children}
      {!isInChat && <Footer />}
    </>
  );
}

export default Index;
