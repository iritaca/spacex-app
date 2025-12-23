import { useIsMobile } from "../../hooks";
import Button from "../Button/Button";
import ChevronIcon from "../icons/ChevronIcon";
import { Skeleton } from "../Loader/Loader";

interface LaunchDetailsButtonProps {
  onClose: () => void;
  mission?: string;
  isLoading: boolean;
}

/**
 * LaunchDetailsButton
 *
 * Displays the main title of the launch details view
 *
 *
 * @param onClose - Callback fired when the button is clicked (Mobile behavior)
 * @param mission - Mission name to display as the title
 * @param isLoading - When true, render a loader skeleton
 *
 * @returns
 */
const LaunchDetailsButton = ({
  onClose,
  mission,
  isLoading,
}: LaunchDetailsButtonProps) => {
  if (isLoading) return <Skeleton className="h-8" />;

  // @Isaac - i need to implement isMobile to return a different component
  const isMobile = useIsMobile();
  return (
    <Button
      variant="custom"
      onClick={onClose}
      label={
        <div className="flex flex-col gap-1 text-left">
          <h3 className="flex gap-2">
            <ChevronIcon
              direction="left"
              className="shrink-0 w-[28px] h-[28px] mt-[2px]"
            />

            <p className="font-bold text-2xl">{mission || "Mission Name"}</p>
          </h3>
        </div>
      }
    />
  );
};

export default LaunchDetailsButton;
