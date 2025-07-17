import Link from "next/link";
import { TracksDisplay } from "@/components/tracks/TracksDisplay";
import { GameFilterProvider } from "@/contexts/GameFilterContext";
import { GameFilterDropdown } from "@/components/filters/GameFilterDropdown";
import { SupabaseDebug } from "@/components/debug/SupabaseDebug";
import { CurrentRaceWeekendDisplay } from "@/components/race/CurrentRaceWeekendDisplay";

export default function Home() {
  return (
    <GameFilterProvider>
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex flex-col">
        {/* Header */}
        <header className="bg-black/50 backdrop-blur-lg border-b border-white/20 relative z-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  F1 Leaderboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <GameFilterDropdown />
                <Link
                  href="/login"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/"
                  className="bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 h-full w-full gap-8 flex flex-col">
          {/* Current Race Weekend */}
          <CurrentRaceWeekendDisplay />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1">
            <TracksDisplay />
          </div>

          {/* Debug Component - Remove in production */}
          <SupabaseDebug />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-red-400">24</p>
              <p className="text-gray-300 text-sm">Races</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-red-400">20</p>
              <p className="text-gray-300 text-sm">Drivers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-red-400">10</p>
              <p className="text-gray-300 text-sm">Teams</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-red-400">15</p>
              <p className="text-gray-300 text-sm">Completed</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/50 backdrop-blur-lg mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} F1 Leaderboard
              </p>
            </div>
          </div>
        </footer>
      </div>
    </GameFilterProvider>
  );
}
