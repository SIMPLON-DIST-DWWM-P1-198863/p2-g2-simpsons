import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const element = document.querySelector(hash);
    element?.scrollIntoView({ behavior: "smooth" });
  }, [hash, key]);

  return null;
}

export default ScrollToHash;
