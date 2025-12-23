import type { IconInstanceProps } from "../../types";
import Icon from "./Icon";

interface ArrowIconProps extends IconInstanceProps {
  direction?: "right" | "left" | "up" | "down";
}
const directionClasses = {
  right: "",
  down: "rotate-90",
  left: "rotate-180",
  up: "rotate-270",
};

const ChevronIcon = ({
  className = "",
  size,
  direction = "right",
}: ArrowIconProps) => {
  return (
    <Icon
      className={`${className} ${directionClasses[direction]} `}
      size={size}
    >
      <path d="M7 16L13 10L7 4" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default ChevronIcon;
