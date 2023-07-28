/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function useMediaQuery(minWidth) {
  const [state, setState] = useState({
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    isDesiredWidth: false,
  });

  useEffect(() => {
    const currentWindowWidth = window?.innerWidth;
    const isDesiredWidth = currentWindowWidth < minWidth;
    setState({ windowWidth: currentWindowWidth, isDesiredWidth });
  }, [minWidth]);

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window?.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [state.windowWidth]);

  return state.isDesiredWidth;
}
