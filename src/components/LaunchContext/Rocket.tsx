import type { MetadataState, RocketMetadata } from "../../types";
import { formatUTCDate } from "../../utils/utils";
import Accordion from "../Accordion/Accordion";
import MetadataList from "../MetadataList/MetadataList";

/**
 * Rocket
 *
 * Displays detailed information about the Rocket
 *
 * @param data - Data realted to Rocket
 *  - name: string
 *  - first_flight: string
 *  - description: string
 *  - success_rate_pct
 * @param isLoading - When true, shows loading skeletons
 * @returns
 */
const Rocket = ({ data, isLoading }: MetadataState<RocketMetadata>) => {
  const { name, first_flight, description, success_rate_pct } = data;

  return (
    <Accordion label={`Rocket: ${name} - Specs`} defaultOpen>
      <MetadataList
        isLoading={isLoading}
        list={[
          { label: "Success rate", value: `${success_rate_pct}%` },
          { label: "First flight", value: formatUTCDate(first_flight) },
        ]}
      />
      <p className="text-base text-secondary mt-2">{description}</p>
    </Accordion>
  );
};

export default Rocket;
