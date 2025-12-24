interface ProgressbarProps {
  progress: number;
  showValue?: boolean;
}

/**
 * Progressbar
 *
 * Displays a horizontal progress indicator
 *
 * @param progress - Number from 0 to 100
 * @param showValue - Option, if true, shows the numeric percentage before the bar
 * @returns
 */
const Progressbar = ({ progress, showValue }: ProgressbarProps) => {
  const children = (
    <div className="w-full h-2 bg-background rounded-md overflow-hidden max-w-full">
      <div className={`h-full bg-accent w-[${progress}%]`} />
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {showValue && <span>{progress}%</span>}
      {children}
    </div>
  );
};

export default Progressbar;
