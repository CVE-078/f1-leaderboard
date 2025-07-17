interface TracksErrorStateProps {
  error: string;
}

export function TracksErrorState({ error }: TracksErrorStateProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="text-red-400 mr-2">🏁</span>
        Tracks
      </h3>
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-200 text-sm">{error}</p>
      </div>
    </div>
  );
}
