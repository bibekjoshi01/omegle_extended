// useOverflowEffect.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useOverflowEffect = () => {
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === "/";

    if (isHomePage) {
      document.documentElement.style.overflowY = "auto";
    } else {
      document.documentElement.style.overflowY = "clip";
    }

    return () => {
      document.documentElement.style.overflowY = "clip";
    };
  }, [location.pathname]);
};

export default useOverflowEffect;
