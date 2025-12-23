import { useMemo, type ChangeEvent } from "react";
import { debounce } from "../../utils/utils";
import SearchIcon from "../icons/SearchIcon";

interface SearchProps {
  value: string;
  placeholder: string;
  onSearch: (query: string) => void;
  onChange: (value: string) => void;
  delay?: number;
  className?: string;
}
/**
 * Search
 * A debounced search input used to filter or query data
 *
 * - Uses a controlled input with debounced side effects
 * - Prevents excessive search calls during typing
 * - Delegates state ownership to the parent
 *
 * @param value - Current search value controlled by the parent
 * @param onSearch - Callback fired when the user stops typing.
 * @param onChange - Fired immediately on input change
 * @param delay - Debounce delay in milliseconds, {default:300ms}
 * @param placeholder - Displays a title to be shown when the container has no value
 * @returns
 */
const Search = ({
  value,
  placeholder,
  onSearch,
  onChange,
  delay = 300,
  className = "",
}: SearchProps) => {
  /**
   * Memoized debounced callback
   * Ensures the debounce timer is preserved across renders
   */
  const debounceSearch = useMemo(
    () => debounce(onSearch, delay),
    [onSearch, delay]
  );

  /**
   * Handles input changes and forwards the value to the debounced
   *  search callback
   *
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    onChange(nextValue); // immediate UI
    debounceSearch(nextValue);
  };
  return (
    <div className={`relative bg-card rounded-sm ${className}`}>
      <SearchIcon className="absolute left-2 top-[14px]" />
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        name="search-box"
        className="w-full h-11 bg-transparent pl-8"
        type="search"
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
