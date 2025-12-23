import type { Sizes } from "../../types";

interface EmptyDescriptionProps {
  children: string | React.ReactNode;
  className?: string;
}
/**
 * Empty state description
 * Textual description used inside EmptyState
 * Accept rich content (strings, links, etc)
 *
 * @param children - Description content
 * @param className - Optional additional styles
 * @returns
 */
export const EmptyStateDescription = ({
  children,
  className = "",
}: EmptyDescriptionProps) => {
  return <p className={`font-medium text-center ${className}`}>{children}</p>;
};

interface EmptyStateProps {
  size?: Sizes;
  className?: string;
  children: React.ReactNode;
}

const sizeClass = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

/**
 * EmptyState
 *
 * A layout container used to display empty or no-data states.
 * Common use cases:
 * - No search results
 * - Empty lists
 * - First-time user states
 *
 * @param size - Controls text sizing
 * @param className - Optional additional styles
 * @param children - Composed content
 * @returns
 */
const EmptyState = ({
  size = "md",
  className = "",
  children,
}: EmptyStateProps) => {
  return (
    <div
      className={`border rounded-md border-primary/60 flex flex-col gap-3 items-center justify-center py-7 ${sizeClass[size]} ${className}`}
    >
      {children}
    </div>
  );
};

export default EmptyState;
