import type { LaunchMissionContext } from "../../types";
import Landpad from "./Landpad";
import Launchpad from "./Launchpad";
import Rocket from "./Rocket";

/**
 * LaunchContext
 *
 * Renders contextual information for a launch mission
 *
 * @param metadata - Object containing the next data:
 * - rocket - Rocket data
 * - launchpad - Launchpad data
 * - landpad - landpad data
 * - isLoading - boolean flag for loading state
 *
 */
const LaunchContext = (metadata: LaunchMissionContext) => {
  return (
    <section className="flex flex-col gap-4">
      {metadata.rocket && (
        <Rocket data={metadata.rocket} isLoading={metadata.isLoading} />
      )}
      {metadata.launchpad && (
        <Launchpad data={metadata.launchpad} isLoading={metadata.isLoading} />
      )}
      {metadata.landpad && (
        <Landpad data={metadata.landpad} isLoading={metadata.isLoading} />
      )}
    </section>
  );
};

export default LaunchContext;
