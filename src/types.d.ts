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
  article: string | null;
  webcast: string | null;
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

export type Rocket = {
  name: string;
  stages: number;
  first_flight: string;
  description: string;
  id: string;
};

export type Landpad = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  landing_attempts: number;
  landing_success: number;
  details: string;
};

export type Launchpad = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  landing_attempts: number;
  landing_success: number;
  rockets: string;
  details?: string;
};

export type MetadataFolder =
  | "rockets"
  | "launchpads"
  | "landpads"
  | "payloads"
  | "cores";
