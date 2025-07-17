import { Track } from "@/types/database";
import { TrackCard } from "./TrackCard";
import {
  getTrackStatus,
  getTrackImageUrl,
  handleImageError,
} from "@/utils/trackUtils";

interface TracksGridProps {
  tracks: Track[];
  highlightedTrackId: string | null;
}

export function TracksGrid({ tracks, highlightedTrackId }: TracksGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tracks.map((track) => {
        const trackStatus = getTrackStatus(track);
        const isHighlighted = track.id === highlightedTrackId;

        return (
          <TrackCard
            key={track.id}
            track={track}
            isHighlighted={isHighlighted}
            trackStatus={trackStatus}
            onImageError={handleImageError}
            getTrackImageUrl={getTrackImageUrl}
          />
        );
      })}
    </div>
  );
}
