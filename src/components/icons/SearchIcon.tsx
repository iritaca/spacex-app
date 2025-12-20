import type { iconInstanceProps } from "../../types";
import Icon from "./Icon";

const SearchIcon = ({ className, size }: iconInstanceProps) => {
  return (
    <Icon className={className} size={size}>
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 14C11.5376 14 14 11.5376 14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M13 13L17 17" stroke="currentColor" strokeWidth="2" />
      </>
    </Icon>
  );
};

export default SearchIcon;
