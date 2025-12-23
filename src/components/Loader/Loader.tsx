/**
 * Skeleton
 *
 * Lightweight loading placeholder used while content
 * is fetching
 * Dimensions are controlled by className for flexibility
 *
 * @param className - Optional additional styles
 *
 */
export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className} animate-pulse`}>
      <div className="h-full w-full rounded bg-gray-700" />
    </div>
  );
};
