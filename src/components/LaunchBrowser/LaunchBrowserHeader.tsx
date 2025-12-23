import type { LaunchData } from "../../types";
import CountContainer from "../CountContainer/CountContainer";

/**
 * LaunchBrowserHeader 
 * 
 * Header section for the launch browser view
 * Displays high-level launch statistics derived from the launch detaset.
 * 
 * Displays:
 * - Page title
 * - Completed mission counts
 * - Total launches count
 * - Total reflights count
 * 
 * Resposibilities
 * - Derives summary metrics from raw launch data
 * - Renders count-based UI elements
 
 * @param data - Full SpaceX launch dataset
 * @returns
 */
const LaunchBrowserHeader = ({ data }: LaunchData) => {
  // Only count successful launches
  const completedMissions = data.filter((m) => m.success === true).length;

  // Counts launches wherre the primary core was reused
  const totalReflights = data.filter((m) => m.cores[0].reused).length;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Rocket Launches</h1>

      <div className="flex justify-between w-full max-w-[410px] ">
        <CountContainer title="completed missions" count={completedMissions} />
        <CountContainer title="total launches" count={data.length} />
        <CountContainer title="total reflights" count={totalReflights} />
      </div>
    </div>
  );
};

export default LaunchBrowserHeader;
