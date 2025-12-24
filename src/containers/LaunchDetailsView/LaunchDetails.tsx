import { AnimatePresence, motion } from "framer-motion";
import type {
  Landpad,
  LaunchApi,
  LaunchData,
  LaunchDetails,
  Launchpad,
  Rocket,
} from "../../types";
import { fetchMetadata, formatUTCDate, safe } from "../../utils/utils";
import LaunchDetailsButton from "../../components/LaunchDetails/LaunchDetailsButton";
import LaunchDetailsVideo from "../../components/LaunchDetails/LaunchDetailsVideo";
import LaunchMetadata from "../../components/LaunchDetails/LaunchMetadata";
import { useEffect, useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import { useIsMobile } from "../../hooks";

interface LaunchDetailsProps extends LaunchData {
  selectedMissionId: string | null;
  onClose?: () => void;
}

type LaunchDetailsState = {
  rocket: Rocket | null;
  launchpad: Launchpad | null;
  landpad: Landpad | null;
  isLoading: boolean;
};
/**
 * LaunchDetails
 *
 * Orchestrates the details view for a selected mission
 *
 * - Maps raw launch API data into a view-friendly structure
 * - Fetches related metadata (rocket, launchpad and landpad)
 * - Manages loading state for a dependent resources
 * - Composes detailed UI sections (Metadata, video, descriptions)
 *
 * Data strategy
 * - Uses the already fetched launch list as the source of truth
 * - Fetches secondary resources only when a mission is selected
 * - Executes metadata requests in parallel for performance
 *
 * @param selectedMissionId - Id of the currently selected launch/mission
 * @param onClose - Callback invoked when the details view is dismissed
 * (mobile behavior)
 * @param data - Full list of launch data from the API
 *
 */
const LaunchDetails = ({
  selectedMissionId,
  onClose,
  data,
}: LaunchDetailsProps) => {
  const [metadata, setMetadata] = useState<LaunchDetailsState>({
    rocket: null,
    launchpad: null,
    landpad: null,
    isLoading: false,
  });

  const mapToLaunchDetails = (m: LaunchApi): LaunchDetails => ({
    missionName: m.name,
    id: m.id,
    launchDate: formatUTCDate(m.date_utc),
    upcoming: m.upcoming,
    video: m.links.webcast,
    article: m.links.article,
    rocket: m.rocket,
    launchpad: m.launchpad,
  });

  const selecetedMissionDetails = data
    .map(mapToLaunchDetails)
    .find((m) => m.id === selectedMissionId);

  useEffect(() => {
    if (!selecetedMissionDetails) return;

    const loadDetails = async () => {
      setMetadata((prev) => ({ ...prev, isLoading: true }));

      const { rocket: rocketId, launchpad: launchpadId } =
        selecetedMissionDetails;

      // landpad may not exist
      const landpadId =
        data.find((m) => m.id === selectedMissionId)?.cores?.[0]?.landpad ??
        undefined;

      const [rocket, launchpad, landpad] = await Promise.all([
        safe(fetchMetadata<Rocket>({ folder: "rockets", id: rocketId })),
        safe(
          fetchMetadata<Launchpad>({ folder: "launchpads", id: launchpadId })
        ),

        landpadId
          ? safe(fetchMetadata<Landpad>({ folder: "landpads", id: landpadId }))
          : Promise.resolve(null),
      ]);

      setMetadata({
        rocket,
        launchpad,
        landpad,
        isLoading: false,
      });
    };

    loadDetails();
  }, [selectedMissionId, data]);

  return (
    <section className="p-4 flex flex-col gap-6 h-full md:flex-1 md:pl-8 md:py-5">
      <LaunchDetailsButton
        mission={selecetedMissionDetails?.missionName}
        onClose={() => onClose?.()}
        isLoading={metadata.isLoading}
      />

      <LaunchMetadata
        rocket={metadata.rocket?.name}
        launchpad={metadata.launchpad?.region}
        landpad={metadata.landpad?.locality}
        launchDate={selecetedMissionDetails?.launchDate}
        isLoading={metadata.isLoading}
      />

      <div className="overflow-y-auto overflow-x-hidden flex flex-col gap-6 w-[calc(100%+16px)] pr-4">
        <LaunchDetailsVideo
          video={selecetedMissionDetails?.video}
          isLoading={metadata.isLoading}
          showEmptyState={!selectedMissionId}
        />

        {metadata.rocket?.description && !metadata.isLoading && (
          <Accordion label="Rocket" defaultOpen>
            <p className="text-base text-secondary">
              {metadata.rocket.description}
            </p>
          </Accordion>
        )}
        {metadata.launchpad?.details && !metadata.isLoading && (
          <Accordion label="Launchpad" defaultOpen>
            <p className="text-base text-secondary">
              {metadata.launchpad.details}
            </p>
          </Accordion>
        )}
        {metadata.landpad?.details && !metadata.isLoading && (
          <Accordion label="Landpad" defaultOpen>
            <p className="text-base text-secondary">
              {metadata.landpad.details}
            </p>
          </Accordion>
        )}
      </div>
    </section>
  );
};

/**
 * LaunchDetailsLayout
 *
 * Layout wrapper for the LaunchDetails view
 *
 * Behavior:
 * - Mobile: renders the details view as a slide-in panel
 * - Desktop: renders the details layout
 *
 * Uses viewport width to determine the layout
 *
 * @param param0
 * @returns
 */
const LaunchDetailsLayout = ({ ...props }: LaunchDetailsProps) => {
  const isOpen = !!props.selectedMissionId;

  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <AnimatePresence>
        <motion.aside
          key="launch-details-mobile"
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ duration: isOpen ? 0.2 : 0.25, ease: "easeOut" }}
          className="fixed inset-0 top-20 z-10 bg-background"
        >
          <LaunchDetails {...props} />
        </motion.aside>
      </AnimatePresence>
    );
  return <LaunchDetails {...props} />;
};

export default LaunchDetailsLayout;
