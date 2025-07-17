"use client";

import { useEffect, useState } from "react";
import { useGameFilter } from "@/contexts/GameFilterContext";
import {
  getCurrentRaceWeekend,
  formatRaceDate,
  CurrentRaceWeekend,
} from "@/services/raceWeekendService";

export function CurrentRaceWeekendDisplay() {
  const { selectedGame } = useGameFilter();
  const [raceWeekend, setRaceWeekend] = useState<CurrentRaceWeekend | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRaceWeekend() {
      setLoading(true);
      try {
        const weekend = await getCurrentRaceWeekend(selectedGame?.id);
        setRaceWeekend(weekend);
      } catch (error) {
        console.error("Failed to fetch race weekend:", error);
        setRaceWeekend(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRaceWeekend();
  }, [selectedGame?.id]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-white/20 rounded mb-2"></div>
            <div className="h-8 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!raceWeekend) {
    return null; // Hide the section if no race weekend data
  }

  const { track, status, daysUntil } = raceWeekend;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {status === "current" ? "Current Race Weekend" : "Next Race Weekend"}
        </h2>
        <h3 className="text-3xl font-bold text-red-400 mb-2">{track.name}</h3>
        {track.location && (
          <p className="text-gray-300 mb-2">📍 {track.location}</p>
        )}
        <div className="text-gray-300">
          {status === "current" && (
            <p className="text-green-400 font-semibold">🔴 LIVE NOW</p>
          )}
          {status === "upcoming" && (
            <div>
              <p>
                Race Weekend: {formatRaceDate(track.start_date)} -{" "}
                {formatRaceDate(track.end_date)}
              </p>
              {daysUntil !== undefined && (
                <p className="text-yellow-400 font-semibold mt-1">
                  {daysUntil === 0
                    ? "Starting today!"
                    : daysUntil === 1
                    ? "Starting tomorrow!"
                    : `Starting in ${daysUntil} days`}
                </p>
              )}
            </div>
          )}
          {status === "current" && (
            <p className="text-sm mt-1">
              {formatRaceDate(track.start_date)} -{" "}
              {formatRaceDate(track.end_date)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
