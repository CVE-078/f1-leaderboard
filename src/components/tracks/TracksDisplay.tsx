"use client";

import { useEffect, useState } from "react";
import { Track } from "@/types/database";
import { getTracksClient } from "@/services/tracksClient";
import { useGameFilter } from "@/contexts/GameFilterContext";
import { useSortState } from "@/hooks/useSortState";
import { sortTracks, getHighlightedTrack } from "@/utils/trackUtils";
import { TracksLoadingState } from "./TracksLoadingState";
import { TracksErrorState } from "./TracksErrorState";
import { TracksEmptyState } from "./TracksEmptyState";
import { TracksHeader } from "./TracksHeader";
import { TracksGrid } from "./TracksGrid";

export function TracksDisplay() {
  const { selectedGame, loading: gamesLoading } = useGameFilter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    sortBy,
    sortDirection,
    isDropdownOpen,
    dropdownRef,
    handleSortChange,
    toggleDropdown,
  } = useSortState();

  useEffect(() => {
    async function fetchTracks() {
      try {
        setLoading(true);
        setError(null);
        const tracksData = await getTracksClient(selectedGame?.id);
        setTracks(tracksData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    }

    if (selectedGame && !gamesLoading) {
      fetchTracks();
    } else if (!gamesLoading && !selectedGame) {
      setLoading(false);
    }
  }, [selectedGame, gamesLoading]);

  // Get processed data
  const sortedTracks = sortTracks(tracks, sortBy, sortDirection);
  const highlightedTrackId = getHighlightedTrack(tracks);

  if (loading) {
    return <TracksLoadingState />;
  }

  if (error) {
    return <TracksErrorState error={error} />;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <TracksHeader
        tracksCount={tracks.length}
        selectedGame={selectedGame}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        isDropdownOpen={isDropdownOpen}
        onToggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
      />

      {tracks.length === 0 ? (
        <TracksEmptyState selectedGame={selectedGame} />
      ) : (
        <TracksGrid
          tracks={sortedTracks}
          highlightedTrackId={highlightedTrackId}
        />
      )}
    </div>
  );
}
