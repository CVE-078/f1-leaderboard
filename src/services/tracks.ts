import { createClient } from '@/utils/supabase/server';
import { Track } from '@/types/database';

export async function getTracks(): Promise<Track[]> {
  const supabase = await createClient();
  
  const { data: tracks, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('Error fetching tracks:', error);
    throw new Error('Failed to fetch tracks');
  }

  return tracks || [];
}

export async function getTrackById(id: string): Promise<Track | null> {
  const supabase = await createClient();
  
  const { data: track, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching track:', error);
    return null;
  }

  return track;
}

export async function getTracksByGameId(gameId: string): Promise<Track[]> {
  const supabase = await createClient();
  
  const { data: tracks, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('game_id', gameId)
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('Error fetching tracks for game:', error);
    throw new Error('Failed to fetch tracks for game');
  }

  return tracks || [];
}
