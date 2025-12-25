import { useEffect, useState } from "react";

/**
 * Count - displays a single numeric value inside a styled box
 * Converts string values to numbers if possible
 * @param value - The value to display
 * @returns
 */
const Count = ({ value }: { value: string }) => {
  return (
    <div
      className={`flex justify-center items-center rounded-sm border border-accent/60 font-mono text-4xl w-[36px] h-[63px] count-mid-line`}
    >
      {value}
    </div>
  );
};

// Transform numbers into individual strings
function formatDigits(count?: number) {
  if (count === undefined || count === null) {
    return ["0", "0", "0"];
  }

  return String(count).padStart(3, "0").split("");
}

/**
 * AnimatedCount
 *
 * Animates a numeric value from 0 to a target number over a fixed duration
 *
 * Animation is driven by `requestAnimationFrame` for smooth, performant updates
 * The animation restarts whenever the `target` value changes
 *
 * @param target - Final number to animate toward
 */
const AnimatedCount = ({ target }: { target: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 sec
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const nextValue = Math.min(
        Math.floor((progress / duration) * target),
        target
      );
      setValue(nextValue);
      if (progress < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return (
    <div className="flex gap-[2px]">
      {formatDigits(value).map((c, i) => (
        <Count value={c} key={`countItem-${c}-${i}`} />
      ))}
    </div>
  );
};

/**
 * CountContainer - displays a numeric value as individual digitis with a title.
 *
 * @param title - the label/title of the count
 * @param count - the numeric value to display, defaults to 0
 * @returns
 */
const CountContainer = ({
  title,
  count,
  isLoading,
}: {
  title: string;
  count?: number;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <AnimatedCount target={isLoading ? 0 : count ?? 0} />
      <h6 className="font-mono text-secondary uppercase text-[10px]">
        {title}
      </h6>
    </div>
  );
};

export default CountContainer;
