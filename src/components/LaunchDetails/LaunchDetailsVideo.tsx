import { toYoutubeEmbeddedUrl } from "../../utils/utils";
import EmptyState, { EmptyStateDescription } from "../EmptyState/EmptyState";
import { Skeleton } from "../Loader/Loader";

interface LaunchDetailsVideoProps {
  video: string | undefined;
  isLoading: boolean;
  showEmptyState: boolean;
}
const videoSizeClasses = "w-full aspect-[4/3] flex-shrink-0";

/**
 * LaunchDetailsVideo
 *
 * Displays the mission video
 *
 * Behavior:
 * - While loading, renders a skeleton placeholder matching the video aspect ratio
 * - If no video is available or URL cannot be embedded, renders an empty state
 * - When available, renders a responsive Youtube iframe
 *
 *
 * @param video - Raw video URL
 * @param isLoading - Whether the video is currently loading
 * @param showEmptyState - shows a special empty state when no selected id
 */
const LaunchDetailsVideo = ({
  video,
  isLoading,
  showEmptyState,
}: LaunchDetailsVideoProps) => {
  if (showEmptyState)
    return (
      <EmptyState className={videoSizeClasses} size="lg">
        <EmptyStateDescription
          children="Select a mission to  explore  details"
          className="max-w-[200px]"
        />
      </EmptyState>
    );
  const embedUrl = toYoutubeEmbeddedUrl(video);

  if (isLoading) return <Skeleton className={videoSizeClasses} />;

  if (!video || !embedUrl)
    return (
      <EmptyState className={videoSizeClasses}>
        <EmptyStateDescription children="No mission video available" />
      </EmptyState>
    );

  return (
    <div
      className={`${videoSizeClasses} border rounded-md border-primary/30 overflow-hidden`}
    >
      <iframe
        src={embedUrl}
        title="Mission video"
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </div>
  );
};

export default LaunchDetailsVideo;
