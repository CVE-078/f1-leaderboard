export function TracksLoadingState() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="text-red-400 mr-2">🏁</span>
        Tracks
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/5 rounded-xl h-48 mb-3"></div>
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
