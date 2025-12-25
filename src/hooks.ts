import { useState, useEffect } from "react";
import {
  DESKTOP_LAYOUT_WIDTH,
  MOBILE_LAYOUT_WIDTH,
  TABLET_LAYOUT_WIDTH,
} from "./constants";

type BreakpointSize = "mobile" | "tablet" | "desktop";

const breakpoints = {
  mobile: MOBILE_LAYOUT_WIDTH,
  tablet: TABLET_LAYOUT_WIDTH,
  desktop: DESKTOP_LAYOUT_WIDTH,
};
/**
 * useBreakpoint
 *
 * Provide information about whether the viewport width
 * is below a give breakpoint
 *
 * @param size - The desired size to use as breakpoint
 */
export function useBreakpoint(size: BreakpointSize) {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoints[size];
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const handler = () => setMatches(getMatches());
    // Sync on mount
    handler();
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, [size]);
  return matches;
}
