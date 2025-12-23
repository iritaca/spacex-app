import { Skeleton } from "../Loader/Loader";

interface MetadataItemProps {
  label: string;
  value?: string;
  isLoading?: boolean;
}

/**
 * Metadata
 *
 * Displays a single label-value pair.
 * Supports a loading state
 *
 * -Renders a fixed width label column
 * - Displays a value or fallback placeholder ('--')
 * - Handles loading state
 *
 * @param label - Label describing the value
 * @param value - Value to display. falls back into "--" when udnefined
 * @param isLoading - When true, replaces the value with a loader
 * @returns
 */
const Metadata = ({ label, value, isLoading }: MetadataItemProps) => {
  let contentToRender = (
    <p className="text-sm text-primary capitalize">{value || "--"}</p>
  );
  if (isLoading) contentToRender = <Skeleton className="h-6 w-full" />;
  return (
    <div className="flex items-start">
      <p className="font-mono text-xs font-light text-secondary uppercase min-w-[160px]">
        {label} :
      </p>
      {contentToRender}
    </div>
  );
};

interface MetadataProps {
  rocket?: string;
  launchpad?: string;
  launchDate?: string;
  landpad?: string;
  isLoading?: boolean;
}

/**
 * LaunchMetadata
 *
 * Displays key metadata froma mission launch
 *
 * @param rocket - Rocket name
 * @param launchpad - Launching site name
 * @param landpad - Landing site name
 * @param launchDate - Launch date (formatted)
 * @param isLoading - Enables loading state for all fields
 * @returns
 */
const LaunchMetadata = ({
  rocket,
  launchpad,
  landpad,
  launchDate,
  isLoading,
}: MetadataProps) => {
  return (
    <div className="border border-primary/30 rounded-md flex flex-col gap-2 bg-card p-3">
      <Metadata label="vehicle" value={rocket} isLoading={isLoading} />
      <Metadata label="launch site" value={launchpad} isLoading={isLoading} />
      <Metadata label="launch date" value={launchDate} isLoading={isLoading} />
      <Metadata label="landing site" value={landpad} isLoading={isLoading} />
    </div>
  );
};

export default LaunchMetadata;
