// Database types based on your existing schema
export interface Track {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  country_code: string;
  status: 'active' | 'inactive';
  game_id: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
}

export interface Game {
  id: string;
  name: string;
  release_year: number;
  created_at: string | null;
}

// API response types
export interface TracksResponse {
  tracks: Track[];
  count: number;
}

export interface GamesResponse {
  games: Game[];
  count: number;
}
