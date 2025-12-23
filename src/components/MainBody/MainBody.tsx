import { useState, useEffect } from "react";
import type { LaunchApi } from "../../types";

import LaunchBrowser from "../LaunchBrowser/LaunchBrowser";
import LaunchDetailsLayout from "../LaunchDetails/LaunchDetails";
import { API_ERROR_MESSAGE, API_LAUNCHES_URL } from "../../constants";

/**
 * MainBody component -
 * Page-level container resposible for:
 * - Fetching SpaceX launch data
 * - Managing selected mission state
 * - Coordinating browser and detail views
 *
 * Orchestration layrer between:
 * - LaunchBrowser
 * - LaunchDetailsLayout
 *
 * Data fetching is handled locally to keep
 * child components presentational
 *
 */
const MainBody = () => {
  const [data, setData] = useState<LaunchApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetch(API_LAUNCHES_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setApiError(API_ERROR_MESSAGE);
        console.error(API_ERROR_MESSAGE, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <LaunchBrowser
        data={data}
        setSelectedMissionId={setSelectedMissionId}
        selectedMissionId={selectedMissionId}
        hasError={!!apiError}
        // isLoading={isLoading} // @Isaac- I'll need to solve this later
      />

      <LaunchDetailsLayout
        selectedMissionId={selectedMissionId}
        onClose={() => setSelectedMissionId(null)}
        data={data}
        // isLoading={isLoading}
      />
    </>
  );
};

export default MainBody;
