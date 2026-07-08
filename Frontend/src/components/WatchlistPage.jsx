import React from 'react';
import { Film } from 'lucide-react';
import MovieCard from './MovieCard';

export default function WatchlistPage({ watchlist, onSelectMovie, onToggleWatchlist }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-mdb-blue border-b-2 border-mdb-taupe pb-2">
        Your Personal Watchlist ({watchlist.length})
      </h2>

      {watchlist.length === 0 ? (
        <div className="text-center mt-20 p-12 bg-mdb-blue/5 border border-dashed border-mdb-taupe/30 rounded-2xl max-w-lg mx-auto flex flex-col items-center">
          <Film className="h-16 w-16 text-mdb-taupe/60 mb-4 stroke-[1.5]" />
          <p className="text-mdb-blue font-bold text-xl mb-1">Your Watchlist is empty</p>
          <p className="text-sm text-mdb-blue/60 max-w-xs text-center">
            Tap the "+ Watchlist" button on any movie card or detail view to curate your collection here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onSelect={() => onSelectMovie(movie)} 
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist} //  Handles real-time removals directly from this view!
            />
          ))}
        </div>
      )}
    </main>
  );
}