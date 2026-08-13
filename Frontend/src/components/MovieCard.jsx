import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function MovieCard({ movie, onSelect, watchlist, onToggleWatchlist, currentUser, onEdit, onDelete }) {
  const imageUrl = movie.poster_url;

  // Check if this specific movie is already saved in the watchlist array
  const isSaved = watchlist?.some(m => m._id === movie._id);

  const getRatingBadgeColor = (rating) => {
    if (rating >= 8.0) return 'bg-mdb-lime text-mdb-void';
    if (rating >= 5.0) return 'bg-mdb-yellow text-mdb-void';
    return 'bg-mdb-hotpink text-white';
  };

  return (
    <div
      onClick={onSelect}
      className="y2k-panel sparkle-hover y2k-glow text-mdb-cream overflow-hidden transition-transform duration-200 flex flex-col h-full relative cursor-pointer group"
      style={{ borderLeft: '8px solid var(--color-mdb-hotpink)' }}
    >
      {/* Poster Image or Placeholder */}
      <div className="w-full h-80 relative bg-zinc-800">
        {imageUrl ? (
          <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-mdb-taupe bg-mdb-blue/40 p-4">
            <span className="text-xs font-semibold tracking-wide text-center font-body">No Poster Available</span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div className={`y2k-border absolute top-3 right-3 px-2 py-1 text-xs font-black flex items-center gap-1 font-body ${getRatingBadgeColor(movie.rating)}`}>
          <span>★</span>
          <span>{movie.rating.toFixed(1)}</span>
        </div>

        {/* Admin Controls Overlay */}
        {currentUser?.isAdmin && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(movie);
              }}
              className="y2k-icon bg-mdb-void/80 p-1.5 text-mdb-cyan hover:text-mdb-lime transition-colors"
              title="Edit movie"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete "${movie.title}" from the catalog?`)) {
                  onDelete(movie._id);
                }
              }}
              className="y2k-icon bg-mdb-void/80 p-1.5 text-mdb-hotpink hover:text-mdb-yellow transition-colors"
              title="Delete movie"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Movie Details Text Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-display text-sm md:text-base line-clamp-1 group-hover:text-mdb-lime transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs font-medium y2k-border px-1.5 py-0.5 text-mdb-taupe font-body">
              {movie.year}
            </span>
            <span className="text-xs text-mdb-taupe line-clamp-1 font-body">
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
          className="y2k-btn mt-4 w-full font-display text-sm relative z-10 py-2 text-mdb-void"
          style={
            isSaved
              ? { border: '3px outset #ff2fd0', background: 'linear-gradient(180deg, #ff5c8a, #dc2626)', color: '#fff' }
              : undefined
          }
        >
          {isSaved ? '✓ Remove' : '+ Watchlist'}
        </button>
      </div>
    </div>
  );
}
