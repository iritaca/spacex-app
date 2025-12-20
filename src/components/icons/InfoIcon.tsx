import type { iconInstanceProps } from "../../types";
import Icon from "./Icon";

const InfoIcon = ({ className, size }: iconInstanceProps) => {
  return (
    <Icon className={className} size={size}>
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path d="M10 6V8" stroke="currentColor" strokeWidth="1.25" />
        <path d="M10 9V14" stroke="currentColor" strokeWidth="1.25" />
      </>
    </Icon>
  );
};

export default InfoIcon;
