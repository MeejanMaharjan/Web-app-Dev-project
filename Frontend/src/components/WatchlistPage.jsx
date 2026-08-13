import React from 'react';
import MovieCard from './MovieCard';

export default function WatchlistPage({ watchlist, onSelectMovie, onToggleWatchlist, currentUser, onEdit, onDelete }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-display y2k-gradient-text mb-6 border-b-4 border-mdb-hotpink pb-2">
        Your Personal Watchlist ({watchlist.length})
      </h2>

      {watchlist.length === 0 ? (
        <div className="y2k-panel text-center mt-20 p-12 max-w-lg mx-auto flex flex-col items-center">
          <span className="text-6xl mb-4">🎞️</span>
          <p className="text-mdb-cream font-display text-xl mb-1">Your Watchlist is empty</p>
          <p className="text-sm text-mdb-taupe max-w-xs text-center font-body">
            Tap the "+ Watchlist" button on any movie card or detail view to curate your collection here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onSelect={() => onSelectMovie(movie)}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist} //  Handles real-time removals directly from this view!
              currentUser={currentUser}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
