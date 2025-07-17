import { Track } from "@/types/database";
import { SortOption, SortDirection, TrackStatus } from "@/types/tracks";

export const sortTracks = (
  tracks: Track[],
  sortBy: SortOption,
  direction: SortDirection
): Track[] => {
  return [...tracks].sort((a, b) => {
    let aValue: string | null;
    let bValue: string | null;

    switch (sortBy) {
      case SortOption.NAME:
        aValue = a.name;
        bValue = b.name;
        break;
      case SortOption.LOCATION:
        aValue = a.location;
        bValue = b.location;
        break;
      case SortOption.START_DATE:
        aValue = a.start_date;
        bValue = b.start_date;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    // Handle null values
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return direction === SortDirection.ASC ? 1 : -1;
    if (bValue === null) return direction === SortDirection.ASC ? -1 : 1;

    const comparison = aValue.localeCompare(bValue);
    return direction === SortDirection.ASC ? comparison : -comparison;
  });
};

export const getHighlightedTrack = (tracks: Track[]): string | null => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // First, check for current races
  const currentTracks = tracks.filter((track) => {
    if (!track.start_date || !track.end_date) return false;
    return track.start_date <= today && track.end_date >= today;
  });

  if (currentTracks.length > 0) {
    // Return the first current track (if multiple races are happening simultaneously)
    return currentTracks[0].id;
  }

  // If no current races, find the closest upcoming race
  const upcomingTracks = tracks
    .filter((track) => {
      if (!track.start_date) return false;
      return track.start_date > today;
    })
    .sort((a, b) => {
      if (!a.start_date || !b.start_date) return 0;
      return (
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
    });

  return upcomingTracks.length > 0 ? upcomingTracks[0].id : null;
};

export const getTrackStatus = (track: Track): TrackStatus => {
  if (!track.start_date || !track.end_date) return TrackStatus.NO_DATE;

  const now = new Date();
  const today = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  const startDate = track.start_date;
  const endDate = track.end_date;

  if (startDate <= today && endDate >= today) {
    return TrackStatus.CURRENT;
  } else if (startDate > today) {
    return TrackStatus.UPCOMING;
  } else {
    return TrackStatus.PAST;
  }
};

export const getTrackImageUrl = (slug: string) => {
  return `/images/backgrounds/${slug}.webp`;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = "/images/tracks/placeholder.svg";
};
