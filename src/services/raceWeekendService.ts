import { createClient } from "@/utils/supabase/client";
import { Track } from "@/types/database";

export interface CurrentRaceWeekend {
  track: Track;
  status: 'current' | 'upcoming';
  daysUntil?: number;
}

export async function getCurrentRaceWeekend(gameId?: string): Promise<CurrentRaceWeekend | null> {
  const supabase = createClient();
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format

  try {
    let query = supabase
      .from('tracks')
      .select('*')
      .eq('status', 'active')
      .not('start_date', 'is', null)
      .not('end_date', 'is', null)
      .order('start_date', { ascending: true });

    // Filter by game if provided
    if (gameId) {
      query = query.eq('game_id', gameId);
    }

    const { data: tracks, error } = await query;

    if (error || !tracks || tracks.length === 0) {
      console.error('Error fetching tracks for race weekend:', error);
      return null;
    }

    // First, check if there's a current race weekend (today is between start and end date)
    const currentTrack = tracks.find(track => {
      if (!track.start_date || !track.end_date) return false;
      return track.start_date <= today && track.end_date >= today;
    });

    if (currentTrack) {
      return {
        track: currentTrack,
        status: 'current'
      };
    }

    // If no current race, find the next upcoming race
    const upcomingTrack = tracks.find(track => {
      if (!track.start_date) return false;
      return track.start_date > today;
    });

    if (upcomingTrack && upcomingTrack.start_date) {
      const startDate = new Date(upcomingTrack.start_date);
      const timeDiff = startDate.getTime() - now.getTime();
      const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return {
        track: upcomingTrack,
        status: 'upcoming',
        daysUntil
      };
    }

    return null;
  } catch (error) {
    console.error('Error in getCurrentRaceWeekend:', error);
    return null;
  }
}

export function formatRaceDate(dateString: string | null): string {
  if (!dateString) return 'TBA';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
