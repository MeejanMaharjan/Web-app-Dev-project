import React from 'react';
import { Star } from 'lucide-react';

export default function MovieCard({ movie, onSelect, watchlist, onToggleWatchlist }) {
  const imageUrl = movie.poster_url;
  
  // Check if this specific movie is already saved in the watchlist array
  const isSaved = watchlist?.some(m => m.id === movie.id);

  const getRatingBadgeColor = (rating) => {
    if (rating >= 8.0) return 'bg-emerald-600 text-white';
    if (rating >= 5.0) return 'bg-amber-500 text-mdb-blue';
    return 'bg-rose-600 text-white';
  };

  return (
    <div 
      onClick={onSelect}
      className="bg-mdb-blue text-mdb-cream rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 flex flex-col h-full border border-mdb-taupe/10 relative cursor-pointer group"
    >
      {/* Poster Image or Placeholder */}
      <div className="w-full h-80 relative bg-zinc-800">
        {imageUrl ? (
          <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-mdb-taupe bg-mdb-blue/40 p-4 border-b border-mdb-taupe/20">
            <span className="text-xs font-semibold tracking-wide text-center">No Poster Available</span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-black shadow flex items-center gap-1 ${getRatingBadgeColor(movie.rating)}`}>
          <Star className="h-3 w-3 fill-current" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Movie Details Text Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-base md:text-lg line-clamp-1 group-hover:text-mdb-green transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs font-medium bg-mdb-cream/10 border border-mdb-cream/20 px-1.5 py-0.5 rounded text-mdb-taupe">
              {movie.year}
            </span>
            <span className="text-xs text-mdb-taupe line-clamp-1">
              {movie.genre}
            </span>
          </div>
        </div>

        {/* Dynamic Watchlist Toggle Button */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); // Prevents opening the popup modal when clicking the button
            onToggleWatchlist(movie); 
          }}
          className={`mt-4 w-full font-bold py-2 rounded text-sm transition-colors relative z-10 ${
            isSaved 
              ? 'bg-rose-600/10 text-rose-600 border border-rose-600/30 hover:bg-rose-600/20' 
              : 'bg-mdb-green hover:bg-opacity-90 text-mdb-blue'
          }`}
        >
          {isSaved ? '✓ Remove' : '+ Watchlist'}
        </button>
      </div>
    </div>
  );
}