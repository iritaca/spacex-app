/**
 * Centralized type definitions for API responses and UI models
 * API types reflect the SpaceX API shape
 * UI types represent normalized, presentation-ready data.
 */

export type Sizes = "sm" | "md" | "lg";
export interface IconInstanceProps {
  className?: string;
  size?: Sizes;
}

export interface IconProps extends IconInstanceProps {
  children: React.ReactNode;
}

interface Core {
  flight: number | null;
  reused: boolean;
  landing_success: boolean | null;
  landing_type: string;
  landpad?: string;
}

interface LaunchLinks {
  article: string;
  webcast: string;
}

export interface LaunchApi {
  id: string;
  name: string;
  date_utc: string;
  upcoming: boolean;
  success: boolean | null;
  cores: Core[];
  links: LaunchLinks;
  rocket: string;
  launchpad: string;
  payloads: string[];
}

export interface LaunchData {
  data: LaunchApi[];
  isLoading: boolean;
}

export interface LaunchedListItem {
  id: string;
  missionName: string;
  date_utc: string;
  upcoming: boolean;
  launchDate: string; // using camelCase for UI models
}

export interface LaunchDetails {
  id: string;
  missionName: string;
  launchDate: string;
  upcoming: boolean;

  video?: string;
  article?: string;

  rocket?: string;
  launchpad?: string;
  payloads?: string[];
}

export type RocketMetadata = {
  name: string;
  stages: number;
  first_flight: string;
  description: string;
  id: string;
  active: any;
  boosters: any;
  success_rate_pct: number;
  company: string;
};

export type LandpadMetadata = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  landing_attempts: number;
  landing_successes: number;
  details: string;
};

export type LaunchpadMetadata = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  launch_attempts: number;
  launch_successes: number;
  rockets: string;
  details?: string;
};

export type MetadataFolder =
  | "rockets"
  | "launchpads"
  | "landpads"
  | "payloads"
  | "cores";

export type AppStatus = "loading" | "success" | "error";

export interface LaunchMissionContext {
  rocket: RocketMetadata | null;
  launchpad: LaunchpadMetadata | null;
  landpad: LandpadMetadata | null;
  isLoading: boolean;
}

export type MetadataState<T> = {
  data: T;
  isLoading: boolean;
};

export type PopoverPosition = {
  left?: number;
  right?: number;
};
