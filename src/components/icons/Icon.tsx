import type { IconProps } from "../../types";

const sizeClass = {
  sm: "w-5 h-5",
  lg: "w-8 h-8",
};
/**
 * Base icon wrapper used to enforce consistent sizing and
 * styling across all icon components
 *
 * @param className - Optional additional styles
 * @param size - Controls icon size, by default "sm" = 20px
 * @param children - SVG icon
 */
const Icon = ({ className, size = "sm", children }: IconProps) => {
  return (
    <svg
      className={`text-secondary ${sizeClass[size]} ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Icon;
