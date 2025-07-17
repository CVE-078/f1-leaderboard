import { Game } from "@/types/database";

interface TracksEmptyStateProps {
  selectedGame: Game | null;
}

export function TracksEmptyState({ selectedGame }: TracksEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400 text-lg">
        {selectedGame
          ? `No tracks found for ${selectedGame.name}`
          : "Select a game to view tracks"}
      </p>
    </div>
  );
}
