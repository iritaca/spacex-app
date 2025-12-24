import type { LaunchpadMetadata, MetadataState } from "../../types";
import { progressValue } from "../../utils/utils";
import Accordion from "../Accordion/Accordion";
import MetadataList from "../MetadataList/MetadataList";
import Progressbar from "../Progressbar/Progressbar";

/**
 * Launchpad
 *
 * Displays detailed information about the Launchpad
 *
 * @param data - Data realted to Launchpad
 *  - name: string
 *  - full_name: string
 *  - locality: string
 *  - region: string
 *  - details: string
 *  - launch_attempts: number
 *  - launch_success: number
 * @param isLoading - When true, shows loading skeletons
 * @returns
 */
const Launchpad = ({ data, isLoading }: MetadataState<LaunchpadMetadata>) => {
  const {
    name,
    full_name,
    locality,
    details,
    region,
    launch_attempts,
    launch_successes,
  } = data;

  const progress = progressValue({
    attempts: launch_successes,
    total: launch_attempts,
  });

  return (
    <Accordion label={`Launchpad : ${name} Specs`} defaultOpen>
      <MetadataList
        isLoading={isLoading}
        list={[
          {
            label: "Success rate",
            value: (
              <Progressbar
                progress={typeof progress === "number" ? progress : 0}
                showValue
              />
            ),
          },
          { label: "Full name", value: full_name },
          { label: "Launch site", value: `${locality}, ${region}` },
        ]}
      />
      <p className="text-base text-secondary mt-2">{details}</p>
    </Accordion>
  );
};

export default Launchpad;
