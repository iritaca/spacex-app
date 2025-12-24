import { useState, useEffect } from "react";
import type { AppStatus, LaunchApi } from "../../types";

import LaunchBrowser from "../LaunchBrowser/LaunchBrowser";
import LaunchDetailsLayout from "../LaunchDetailsView/LaunchDetails";
import { API_ERROR_MESSAGE, API_LAUNCHES_URL } from "../../constants";
import LaunchBrowserHeader from "../../components/LaunchBrowser/LaunchBrowserHeader";
import RetryButton from "../../components/RetryButton/RetryButton";

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
  const [status, setStatus] = useState<AppStatus>("loading");
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(
    null
  );

  const fetchInitialData = async () => {
    setStatus("loading");

    try {
      const res = await fetch(API_LAUNCHES_URL);
      if (!res.ok) throw new Error(API_ERROR_MESSAGE);

      const data = await res.json();
      setData(data);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <>
      <LaunchBrowserHeader data={data} isLoading={status === "loading"} />
      <main className="overflow-y-auto h-full min-h-0 md:flex md:flex-row">
        <LaunchBrowser
          data={data}
          setSelectedMissionId={setSelectedMissionId}
          selectedMissionId={selectedMissionId}
          isLoading={status === "loading"}
        />

        <LaunchDetailsLayout
          selectedMissionId={selectedMissionId}
          onClose={() => setSelectedMissionId(null)}
          data={data}
          isLoading={status === "loading"}
        />
      </main>

      {/* Visible when initial API load fails */}
      {status === "error" && <RetryButton onClick={fetchInitialData} />}
    </>
  );
};

export default MainBody;
