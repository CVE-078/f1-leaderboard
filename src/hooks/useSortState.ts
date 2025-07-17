import { useState, useEffect, useRef } from "react";
import { SortOption, SortDirection } from "@/types/tracks";

export const useSortState = () => {
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NAME);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      // Toggle direction if same sort option
      setSortDirection(
        sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC
      );
    } else {
      // Set new sort option with ascending direction
      setSortBy(newSortBy);
      setSortDirection(SortDirection.ASC);
    }
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return {
    sortBy,
    sortDirection,
    isDropdownOpen,
    dropdownRef,
    handleSortChange,
    toggleDropdown,
  };
};
