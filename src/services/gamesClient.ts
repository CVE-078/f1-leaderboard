import { createClient } from '@/utils/supabase/client';
import { Game } from '@/types/database';

export async function getGamesClient(): Promise<Game[]> {
  const supabase = createClient();
  
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select('*')
      .order('release_year', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
      throw new Error(`Failed to fetch games: ${error.message}`);
    }

    return games || [];
  } catch (error) {
    console.error('Network error fetching games:', error);
    throw error;
  }
}

export async function getLatestGameClient(): Promise<Game | null> {
  const supabase = createClient();
  
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select('*')
      .order('release_year', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching latest game:', error);
      throw new Error(`Failed to fetch latest game: ${error.message}`);
    }

    return games && games.length > 0 ? games[0] : null;
  } catch (error) {
    console.error('Network error fetching latest game:', error);
    throw error;
  }
}
