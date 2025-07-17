import { SortOption, SortDirection } from "@/types/tracks";

interface SortDropdownProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption) => void;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function SortDropdown({
  sortBy,
  sortDirection,
  onSortChange,
  isOpen,
  onToggle,
  dropdownRef,
}: SortDropdownProps) {
  const getSortLabel = (sortOption: SortOption) => {
    const labels = {
      [SortOption.NAME]: "Name",
      [SortOption.LOCATION]: "Location",
      [SortOption.START_DATE]: "Date",
    };
    return labels[sortOption];
  };

  const sortOptions = [
    { key: SortOption.NAME, label: "Name", icon: "🏁" },
    { key: SortOption.LOCATION, label: "Location", icon: "📍" },
    { key: SortOption.START_DATE, label: "Date", icon: "📅" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
      >
        <span className="text-sm">Sort by: {getSortLabel(sortBy)}</span>
        <span className="text-xs">
          {sortDirection === SortDirection.ASC ? "↑" : "↓"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => onSortChange(option.key)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-white/10 ${
                  sortBy === option.key
                    ? "bg-red-600/20 text-red-300"
                    : "text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
                {sortBy === option.key && (
                  <span className="text-xs">
                    {sortDirection === SortDirection.ASC ? "↑" : "↓"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
