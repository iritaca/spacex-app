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
 * CountContainer - displays a numeric value as individual digitis with a title.
 *
 * @param title - the label/title of the count
 * @param count - the numeric value to display, defaults to 0 if undefined
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
  const valueToUse = isLoading ? undefined : count;
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-[2px]">
        {formatDigits(valueToUse).map((c, i) => (
          <Count value={c} key={`countItem-${c}-${i}`} />
        ))}
      </div>
      <h6 className="font-mono text-secondary uppercase text-[10px]">
        {title}
      </h6>
    </div>
  );
};

export default CountContainer;
