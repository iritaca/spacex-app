import type { MetadataFolder } from "../types";

/**
 * Creates a lightweight debounced version of a function
 *
 * Intended for UI events (search, resize), not for complex schedulling
 *
 * The debounced function delays invoking `fn` until after
 *  `delay` miliseconds have elapsed since the last time it
 *  was called
 *
 * @param fn - The function to debounce
 * @param delay - Delay in miliseconds
 * @returns  - a debounced version of `fn`
 */
export function debounce<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Return a formated date
 * e.g. Oct 06, 2022
 * @param dataUtc
 */
export function formatUTCDate(dataUtc: string): string {
  return new Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dataUtc));
}

/**
 * This function converts the URL to a YouTube embed URL,
 * to avoid embedding youtu.be or watch?v= directly by
 *  validating:
 * - the host
 * - extract only video ID
 * - prevents arbitrary URLs
 * @param url - Youtube url for videos
 */
export function toYoutubeEmbeddedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      // pathname - includes '/'
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 *
 * Safetly resolves a promise, returning null on failure.
 * Useful for optional data where errors should not block UI
 * rendering.
 */
export const safe = <T>(p: Promise<T>): Promise<T | null> =>
  p.catch(() => null);

/**
 * This cache is in-memory and scoped to the browser session.
 * If the app scales or requires persistence, this could be
 * replaced with:
 * - React Query
 * - IndexedDB / localStorage
 */
const cache = new Map<string, unknown>();
/**
 * Fetch metadata from a mission and stores results in `cache`
 * @param id -  mission id
 * @param folder - metadata folder for the API req
 * @returns
 */
const API_BASE_URL = "https://api.spacexdata.com/v4/";
export const fetchMetadata = async <T>({
  id,
  folder,
}: {
  id?: string;
  folder: MetadataFolder;
}): Promise<T> => {
  // Prevent bad requests
  if (!id) throw new Error("Missing id");

  // for the cache
  const key = `${folder}:${id}`;
  if (cache.has(key)) return cache.get(key) as T;

  const res = await fetch(`${API_BASE_URL}${folder}/${id}`);

  if (!res.ok) throw new Error(`Failed to fecth ${folder}/${id} ${res.status}`);

  const data = await res.json();

  cache.set(key, data);

  return data;
};
