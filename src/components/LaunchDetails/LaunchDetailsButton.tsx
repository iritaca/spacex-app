import { useBreakpoint } from "../../hooks";
import Button from "../Button/Button";
import ChevronIcon from "../icons/ChevronIcon";
import { Skeleton } from "../Loader/Loader";

interface LaunchDetailsButtonProps {
  onClose: () => void;
  mission?: string;
  isLoading: boolean;
}
const GoBackIcon = ({ className = "" }: { className?: string }) => {
  return (
    <ChevronIcon
      direction="left"
      className={`shrink-0 w-[28px] h-[28px] mt-[2px] ${className}`}
    />
  );
};

const LaunchDetailsSkeleton = () => (
  <Skeleton className="h-full max-h-8 flex-1" />
);

const LaunchDetailsTitle = ({ title }: { title?: string }) => (
  <p className="font-bold text-2xl">{title || "Mission Name"}</p>
);

/**
 * LaunchDetailsButton
 *
 * Displays the main title of the launch details view
 * On mobile, acts as a navigational button
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
  const isMobile = useBreakpoint("mobile");

  if (isMobile) {
    if (isLoading)
      return (
        <div className="flex gap-1">
          {/* Prevents the user from getting stuck when data takes long time to load */}
          <Button onClick={onClose} variant="custom" icon={<GoBackIcon />} />

          <LaunchDetailsSkeleton />
        </div>
      );

    return (
      <Button
        variant="custom"
        onClick={onClose}
        label={
          <div className="flex flex-col gap-1 text-left">
            <h3 className="flex gap-2">
              <GoBackIcon className="bg-accent/60 rounded-s text-primary" />

              <LaunchDetailsTitle title={mission} />
            </h3>
          </div>
        }
      />
    );
  }
  if (isLoading) return <LaunchDetailsSkeleton />;
  return <LaunchDetailsTitle title={mission} />;
};

export default LaunchDetailsButton;
