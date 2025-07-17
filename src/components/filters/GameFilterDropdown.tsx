"use client";

import { useState, useRef, useEffect } from "react";
import { useGameFilter } from "@/contexts/GameFilterContext";

export function GameFilterDropdown() {
  const {
    selectedGame,
    games,
    loading,
    error,
    setSelectedGame,
    retryLoadGames,
  } = useGameFilter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-white/20 rounded-lg w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <button
        onClick={retryLoadGames}
        className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-medium py-2 px-4 rounded-lg border border-red-500/50 hover:border-red-500/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
      >
        <span className="text-sm">Error Loading Games</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative z-100" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
      >
        <span className="text-sm">
          {selectedGame ? selectedGame.name : "Select Game"}
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-white/10">
              Select Game
            </div>
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setSelectedGame(game);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors ${
                  selectedGame?.id === game.id
                    ? "bg-red-600/20 text-red-300 border-l-2 border-red-500"
                    : "text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{game.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
