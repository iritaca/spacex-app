import { Skeleton } from "../Loader/Loader";

interface MetadataItemProps {
  label: string;
  value?: string | React.ReactNode;
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
export const Metadata = ({ label, value, isLoading }: MetadataItemProps) => {
  let contentToRender = (
    <p className="text-sm text-primary capitalize w-full">{value || "--"}</p>
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
  isLoading?: boolean;
  list: {
    label: string;
    value?: string | React.ReactNode;
  }[];
}

/**
 * MetadataList
 *
 * Displays a list of key metadata inside a box
 *
 * @param list - An array of title and value
 * @param isLoading - Enables loading
 * @returns
 */
const MetadataList = ({ isLoading, list }: MetadataProps) => {
  return (
    <div className="border border-primary/30 rounded-md flex flex-col gap-2 bg-card p-3">
      {list.map((data) => (
        <Metadata {...data} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default MetadataList;
