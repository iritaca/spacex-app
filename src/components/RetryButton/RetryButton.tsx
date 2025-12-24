import Button from "../Button/Button";

const STORAGE_KEY = "retry-count";
const DEFAULT_MAX_RETRIES = 3;

interface RetryButtonProps {
  onClick: () => void;
}

const getRetries = () => Number(sessionStorage.getItem(STORAGE_KEY) || 0);

/**
 * RetryButton
 *
 * A guarded retry action used when API data fails to load
 * Limits the number of retries per session to prevent infinite retry loops
 * and excessive API calls
 *
 * Behavior:
 * - Persists retyr count in `sessionStorage`
 * - Disables itself once the retry limit is reached
 * - Updates its label to reflect the remaining retries
 *
 * UX:
 * - Encourages a full refresh or later retry once the limit is reached
 *
 * @param onClick - Calback triggered when a retry is allowed
 */
const RetryButton = ({ onClick }: RetryButtonProps) => {
  const retries = getRetries();
  const retriesLeft = DEFAULT_MAX_RETRIES - retries;
  const hasReachedLimit = retriesLeft <= 0;

  const handleClick = () => {
    if (hasReachedLimit) {
      // @Isaac - to decide if a new component will be created for toasts
      // "Retry limit reached. Please refresh or try again later."
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, String(retries + 1));

    onClick();
  };

  const label = hasReachedLimit
    ? "No retries left"
    : `Retry loading data (${retriesLeft}) left`;

  return (
    <Button
      className="w-[calc(100vw-48px)] ml-4 absolute z-10 bottom-8 md:max-w-xs md:ml-8"
      label={label}
      onClick={handleClick}
      isDisabled={hasReachedLimit}
    />
  );
};

export default RetryButton;
