import { useEffect, useState } from "react";

const useWindow = () => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 10000
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 10000
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize, windowHeight]);

  return { windowSize, windowHeight };
};

export default useWindow;
