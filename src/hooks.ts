import { useState, useEffect } from "react";
import { MOBILE_LAYOUT_WIDTH } from "./constants";

export function useIsMobile(breakpoint: number = MOBILE_LAYOUT_WIDTH) {
  const getMatches = () =>
    typeof window !== "undefined" && window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState<boolean>(getMatches);

  useEffect(() => {
    const handler = () => setIsMobile(getMatches());

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}
