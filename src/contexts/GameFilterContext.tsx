'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '@/types/database';
import { getGamesClient } from '@/services/gamesClient';

interface GameFilterContextType {
  selectedGame: Game | null;
  games: Game[];
  loading: boolean;
  error: string | null;
  setSelectedGame: (game: Game | null) => void;
  retryLoadGames: () => void;
}

const GameFilterContext = createContext<GameFilterContextType | undefined>(undefined);

export function GameFilterProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading games from Supabase...');
      const gamesData = await getGamesClient();
      console.log('Games data received:', gamesData);
      
      setGames(gamesData);
      
      // Set the latest game as default
      if (gamesData.length > 0) {
        const latestGame = gamesData[0]; // Already sorted by release_year desc
        console.log('Setting latest game as default:', latestGame);
        setSelectedGame(latestGame);
      } else {
        console.log('No games found in database');
        setError('No games found in database. Please add some games first.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load games';
      console.error('Error loading games:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const retryLoadGames = () => {
    loadGames();
  };

  return (
    <GameFilterContext.Provider value={{
      selectedGame,
      games,
      loading,
      error,
      setSelectedGame,
      retryLoadGames
    }}>
      {children}
    </GameFilterContext.Provider>
  );
}

export function useGameFilter() {
  const context = useContext(GameFilterContext);
  if (context === undefined) {
    throw new Error('useGameFilter must be used within a GameFilterProvider');
  }
  return context;
}
