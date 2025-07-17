import { Game } from "@/types/database";
import { SortDropdown } from "../ui/SortDropdown";
import { SortOption, SortDirection } from "@/types/tracks";

interface TracksHeaderProps {
  tracksCount: number;
  selectedGame: Game | null;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption) => void;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function TracksHeader({
  tracksCount,
  selectedGame,
  sortBy,
  sortDirection,
  onSortChange,
  isDropdownOpen,
  onToggleDropdown,
  dropdownRef,
}: TracksHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-white flex items-center">
        <span className="text-red-400 mr-2">🏁</span>
        Tracks ({tracksCount})
        {selectedGame && (
          <span className="ml-2 text-sm font-normal text-gray-400">
            - {selectedGame.name}
          </span>
        )}
      </h3>

      {/* Sort Controls */}
      {tracksCount > 0 && (
        <SortDropdown
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
          isOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
}
