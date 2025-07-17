import { createClient } from '@/utils/supabase/client';
import { Track } from '@/types/database';

export async function getTracksClient(gameId?: string): Promise<Track[]> {
  const supabase = createClient();
  
  let query = supabase
    .from('tracks')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (gameId) {
    query = query.eq('game_id', gameId);
  }

  const { data: tracks, error } = await query;

  if (error) {
    console.error('Error fetching tracks:', error);
    throw new Error('Failed to fetch tracks');
  }

  return tracks || [];
}

export async function getTracksByGameIdClient(gameId: string): Promise<Track[]> {
  return getTracksClient(gameId);
}
