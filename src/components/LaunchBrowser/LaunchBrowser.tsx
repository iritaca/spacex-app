import type { LaunchData, LaunchedListItem } from "../../types";
import { formatUTCDate } from "../../utils/utils";
import Accordion from "../Accordion/Accordion";
import Button from "../Button/Button";
import LaunchBrowserHeader from "./LaunchBrowserHeader";
import MissionsList, {
  MissionSearchableList,
} from "../MissionsList/MissionsList";

interface LaunchBrowserProps extends LaunchData {
  selectedMissionId: string | null;
  setSelectedMissionId: React.Dispatch<React.SetStateAction<string | null>>;
  hasError: boolean;
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
 * @param hasError - Indicates whether intial API load failed
 *
 */
const LaunchBrowser = ({
  data,
  selectedMissionId,
  setSelectedMissionId,
  hasError,
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
    <section className="flex flex-col gap-6 pt-6 px-4 h-[calc(100vh-80px)]">
      <LaunchBrowserHeader data={data} />

      <section className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden min-h-0 pr-4 max-h-[calc(100vh-350px)] w-[calc(100%+16px)]">
        <Accordion label="Active missions">
          {/* Active missions intentionally empty.
          SpaceX API does not expose active/latest missions.
          Most recent available launch data is from 2022.*/}
          <MissionsList
            onSelect={setSelectedMissionId}
            selectedId={selectedMissionId}
            missions={[]}
          />
        </Accordion>
        <Accordion label="Upcoming launches">
          <MissionsList
            missions={upcommingMissions}
            onSelect={setSelectedMissionId}
            selectedId={selectedMissionId}
          />
        </Accordion>
        <Accordion label="Past Launches" defaultOpen>
          <MissionSearchableList
            missions={pastMissions}
            selectedId={selectedMissionId}
            onSelect={setSelectedMissionId}
          />
        </Accordion>
      </section>

      {/* Visible when initial API load fails */}
      {/* @Isaac - return here to add functionality */}
      {hasError && <Button label="Load data" onClick={() => {}} />}
    </section>
  );
};

export default LaunchBrowser;
