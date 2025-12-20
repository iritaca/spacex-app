import type { iconInstanceProps } from "../../types";
import Icon from "./Icon";

const ChevronIcon = ({ className, size }: iconInstanceProps) => {
  return (
    <Icon className={className} size={size}>
      <path d="M7 16L13 10L7 4" stroke="currentColor" stroke-width="2" />
    </Icon>
  );
};

export default ChevronIcon;
