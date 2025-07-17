import Image from "next/image";
import Flag from "react-world-flags";
import { Track } from "@/types/database";
import { TrackStatus } from "@/types/tracks";

interface TrackCardProps {
  track: Track;
  isHighlighted: boolean;
  trackStatus: TrackStatus;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  getTrackImageUrl: (slug: string) => string;
}

export function TrackCard({
  track,
  isHighlighted,
  trackStatus,
  onImageError,
  getTrackImageUrl,
}: TrackCardProps) {
  return (
    <div className="group cursor-pointer transform transition-all duration-500">
      {/* Track Card */}
      <div
        className={`relative bg-white/5 rounded-xl overflow-hidden border transition-all duration-500 ${
          isHighlighted && trackStatus === TrackStatus.CURRENT
            ? "border-green-400/60 ring-2 ring-green-400/30 shadow-lg shadow-green-400/20"
            : isHighlighted && trackStatus === TrackStatus.UPCOMING
            ? "border-yellow-400/60 ring-2 ring-yellow-400/30 shadow-lg shadow-yellow-400/20"
            : "border-white/10 hover:border-white/30"
        }`}
      >
        {/* Status Badge */}
        {isHighlighted && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30">
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                trackStatus === TrackStatus.CURRENT
                  ? "bg-green-500 text-white animate-pulse"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {trackStatus === TrackStatus.CURRENT
                ? "🔴 LIVE NOW"
                : "⏰ UPCOMING"}
            </div>
          </div>
        )}

        {/* Background Image */}
        <div className="relative h-full aspect-[16/10] overflow-hidden">
          <Image
            src={getTrackImageUrl(track.slug)}
            alt={track.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={onImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Country Flag */}
          <div className="absolute top-3 left-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
              <Flag
                code={track.country_code}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Calendar Date Element */}
          {track.start_date && (
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-red-600 px-2 py-0.5">
                  <div className="text-white text-xs font-medium text-center">
                    {new Date(track.start_date)
                      .toLocaleDateString("en-GB", { month: "short" })
                      .toUpperCase()}
                  </div>
                </div>
                {/* Calendar Date */}
                <div className="px-2 py-1 bg-white/95">
                  <div className="text-gray-900 font-bold text-center leading-none">
                    {new Date(track.start_date).getDate()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card Content */}
          <div className="p-4 relative z-20 flex flex-col h-full justify-end">
            <h4 className="text-white font-bold text-xl">{track.name}</h4>

            {track.location && (
              <p className="text-white text-sm">{track.location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
