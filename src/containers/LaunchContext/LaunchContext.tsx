import type { LaunchMissionContext } from "../../types";
import MetadataList from "../../components/MetadataList/MetadataList";
import Landpad from "../../components/LaunchContext/Landpad";
import Launchpad from "../../components/LaunchContext/Launchpad";
import Rocket from "../../components/LaunchContext/Rocket";

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
    <section className="flex flex-col gap-4 flex-1 xl:h-full xl:overflow-y-auto xl:pr-4">
      {metadata.rocket && (
        <Rocket data={metadata.rocket} isLoading={metadata.isLoading} />
      )}
      {metadata.launchpad && (
        <Launchpad data={metadata.launchpad} isLoading={metadata.isLoading} />
      )}
      {metadata.landpad && (
        <Landpad data={metadata.landpad} isLoading={metadata.isLoading} />
      )}
      {/* Empty state */}
      {!metadata.rocket && !metadata.launchpad && (
        <div className="xl:mt-14 flex flex-col gap-4 ">
          {Array(3)
            .fill(undefined)
            .map((_, idx) => (
              <MetadataList
                key={idx}
                list={[]}
                className={`h-32 opacity-[calc(${idx}*0.2]`}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default LaunchContext;
