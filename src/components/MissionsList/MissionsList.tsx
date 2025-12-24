import { useState } from "react";
import Button from "../Button/Button";
import ChevronIcon from "../icons/ChevronIcon";
import Search from "../Search/Search";
import EmptyState, { EmptyStateDescription } from "../EmptyState/EmptyState";
import SearchIcon from "../icons/SearchIcon";

interface MissionButtonProps {
  onClick: () => void;
  missionName: string;
  launchDate: string;
  hasBorder: { borderTop: boolean; borderBottom: boolean };
  selectedId: string | null;
  id: string;
}
/**
 * Mission Button
 *
 * A list item action representing a single SpaceX mission
 * Displays a Mission name and launch date
 *
 * Responsibilities
 * - Normalizes mission naming for UI consistency
 * - Applies visual selection state
 * - Handles rounded border for list grouping
 *
 * Note:
 * - Some mission names already include the word 'mission' from DB, the component handle naming consistency
 *
 * @param onClick - Fired when the mission is selected
 * @param missionName - Name of the mission
 * @param launchDate - Formatted launch date string
 * @param hasBorder - Controls top/bottom rounding for group lists
 * @param selectedId - Currently selected mission Id
 * @param id - Mission id from DB
 */
const MissionButton = ({
  onClick,
  missionName,
  launchDate,
  hasBorder,
  selectedId,
  id,
}: MissionButtonProps) => {
  return (
    <Button
      variant="custom"
      onClick={onClick}
      label={
        <div className="flex flex-col items-start">
          <div className="text-xs font-medium capitalize text-primary text-left">
            {/* Few mission names from DB includes the word mission, for consistency and clarity the word "mission" will be appended  */}
            {missionName} {missionName.includes("mission") ? "" : "mission"}
          </div>
          <div className="text-[10px] text-secondary text-left">
            {launchDate}
          </div>
        </div>
      }
      icon={<ChevronIcon />}
      className={`w-full flex justify-between items-center p-2  hover:bg-card/60 duration-150 ${
        hasBorder.borderTop ? "rounded-t-sm" : ""
      } ${hasBorder.borderBottom ? "rounded-b-sm" : ""} ${
        selectedId === id ? "bg-accent/60" : "bg-card"
      }`}
    />
  );
};

type Mission = {
  missionName: string;
  id: string;
  launchDate: string;
  upcoming: boolean;
};

interface MissionListProps {
  missions: Mission[];
  onSelect: (id: string) => void;
  selectedId: string | null;
  customEmptyState?: React.ReactNode;
  isLoading: boolean;
}

/**
 * MissionList
 *
 * Stateless renderer for a collection of missions
 * Delegates selection handling to the parent
 *
 * Responsibilities:
 * - Renders a list of MissionButton items
 * - Handles empty state rendering
 *
 * @param missions - Array of missions to render
 * @param onSelect - Callback when a mission is selected
 * @param selectedId - Currently selected mission id
 * @param customEmptyState - Optional override for empty state UI
 */
const MissionsList = ({
  missions,
  onSelect,
  selectedId,
  customEmptyState,
  isLoading,
}: MissionListProps) => {
  if (isLoading) return <></>;
  // Renders empty state
  if (missions.length === 0) {
    if (!customEmptyState)
      return (
        <EmptyState>
          <EmptyStateDescription children="No reliable data to determine missions" />
        </EmptyState>
      );
    return <>{customEmptyState}</>;
  }
  return (
    <>
      {missions.map((mission, idx) => (
        <MissionButton
          key={mission.id}
          {...mission}
          onClick={() => {
            onSelect(mission.id);
          }}
          hasBorder={{
            borderBottom: idx === missions.length - 1,
            borderTop: idx === 0,
          }}
          selectedId={selectedId}
        />
      ))}
    </>
  );
};

export default MissionsList;

/**
 * MissionSearchableList
 *
 * Stateful feature component that enhances MissionList
 * with search and filtering capabilities
 *
 * Responsibilities
 * - Manages search query state
 * - Filters missions by name
 * - Renders search input and contextual empty state
 *
 * Notes:
 * - Search input is debounced via the Search component
 * - Selegates list rendering to MissionList
 *
 * @param missions - Array of missions
 * @param selectedId - Currently selected mission id
 * @param onSelect - Callbak when a mission is selected
 * @returns
 */
export const MissionSearchableList = ({
  missions,
  selectedId,
  onSelect,
  isLoading,
}: MissionListProps) => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  if (missions.length === 0)
    return (
      <EmptyState>
        <EmptyStateDescription children="No reliable data to determine missions" />
      </EmptyState>
    );

  const filteredMissions = missions.filter((mission) =>
    mission.missionName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Search
        placeholder="Search by mission name"
        value={inputValue}
        onSearch={setQuery}
        onChange={setInputValue}
        className="mb-3"
        isDisabled={isLoading}
      />
      {filteredMissions && (
        <MissionsList
          missions={filteredMissions}
          selectedId={selectedId}
          onSelect={onSelect}
          customEmptyState={
            <EmptyState className="missionListEmptyState">
              <SearchIcon size="lg" />
              <EmptyStateDescription children="No results match your search" />
              <Button
                onClick={() => {
                  setQuery("");
                  setInputValue("");
                }}
                label="Clear search"
                className="w-auto py-3 px-4"
              />
            </EmptyState>
          }
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
