import type { LaunchData, LaunchedListItem } from "../../types";
import { formatUTCDate } from "../../utils/utils";
import Accordion from "../../components/Accordion/Accordion";
import MissionsList, {
  MissionSearchableList,
} from "../../components/MissionsList/MissionsList";

interface LaunchBrowserProps extends LaunchData {
  selectedMissionId: string | null;
  setSelectedMissionId: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * LaunchBrowser
 *
 * Main browsing interface for SpaceX launches
 *
 * Responsibilities :
 * - Transforms raw launch data into UI-friendly mission list
 * - Groups missions by status (active, upcoming and past)
 * - Sorts missions based on UX expectations
 * - Coordinates selection state across mission lists
 *
 * Data flow:
 * - Receives raw launch data from parent
 * - Emits selected mission ID
 *
 * @param data - Full SpaceX launch dataset
 * @param selectedMissionId - The current selected mission Id
 * @param setSelectedMissionId - selection state updater
 *
 */
const LaunchBrowser = ({
  data,
  selectedMissionId,
  setSelectedMissionId,
  isLoading,
}: LaunchBrowserProps) => {
  // Displays missions in Ascending order (Oldest to newest)
  const sortedByDateAsc = [...data].sort(
    (a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
  );

  const launchMissions: LaunchedListItem[] = sortedByDateAsc.map((m) => ({
    missionName: m.name,
    id: m.id,
    launchDate: formatUTCDate(m.date_utc),
    date_utc: m.date_utc,
    upcoming: m.upcoming,
  }));

  const upcommingMissions = launchMissions.filter((m) => m.upcoming);

  // Displays Past Missions in Descending order, better for UX
  const pastMissions = [...launchMissions]
    .filter((m) => !m.upcoming)
    .sort(
      (a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
    );

  return (
    <section className="flex flex-col min-h-0 pt-6 pb-8 px-4 md:overflow-y-auto md:flex-1 md:max-w-96 md:pl-8">
      <Accordion label="Active missions" stickyTopOffset={6}>
        {/* Active missions intentionally empty.
          SpaceX API does not expose active/latest missions.
          Most recent available launch data is from 2022.*/}
        <MissionsList
          onSelect={setSelectedMissionId}
          selectedId={selectedMissionId}
          missions={[]}
          isLoading={isLoading}
        />
      </Accordion>
      <Accordion label="Upcoming launches" stickyTopOffset={6}>
        <MissionsList
          missions={upcommingMissions}
          onSelect={setSelectedMissionId}
          selectedId={selectedMissionId}
          isLoading={isLoading}
        />
      </Accordion>
      <Accordion label="Past Launches" defaultOpen stickyTopOffset={6}>
        <MissionSearchableList
          missions={pastMissions}
          selectedId={selectedMissionId}
          onSelect={setSelectedMissionId}
          isLoading={isLoading}
        />
      </Accordion>
    </section>
  );
};

export default LaunchBrowser;

// max-h-[calc(100vh-350px)]
