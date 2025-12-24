import type { LandpadMetadata, MetadataState } from "../../types";
import { progressValue } from "../../utils/utils";
import Accordion from "../Accordion/Accordion";
import MetadataList from "../MetadataList/MetadataList";
import Progressbar from "../Progressbar/Progressbar";

/**
 * Landpad
 *
 * Displays detailed information about the Landpad
 *
 * @param data - Data realted to Landpad
 *  - name: string
 *  - full_name: string
 *  - locality: string
 *  - region: string
 *  - details: string
 *  - landing_attempts: number
 *  - landing_success: number
 * @param isLoading - When true, shows loading skeletons
 * @returns
 */
const Landpad = ({ data, isLoading }: MetadataState<LandpadMetadata>) => {
  const {
    name,
    full_name,
    locality,
    region,
    details,
    landing_attempts,
    landing_successes,
  } = data;

  const progress = progressValue({
    attempts: landing_successes,
    total: landing_attempts,
  });

  return (
    <Accordion label={`Landpad : ${name} Specs`} defaultOpen>
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
          { label: "full name", value: full_name },
          { label: "landing site", value: `${locality}, ${region}` },
        ]}
      />
      <p className="text-base text-secondary mt-2">{details}</p>
    </Accordion>
  );
};

export default Landpad;
