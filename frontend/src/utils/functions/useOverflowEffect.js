// useOverflowEffect.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useOverflowEffect = () => {
  const location = useLocation();

  useEffect(() => {
    const isHomePageOrContact = location.pathname === "/" || location.pathname==='/contact';

    if (isHomePageOrContact) {
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
