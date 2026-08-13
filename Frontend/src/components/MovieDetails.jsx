import React from 'react';
import { Calendar, User } from 'lucide-react';
import Modal from './Modal';

export default function MovieDetails({ movie, onClose, watchlist, onToggleWatchlist }) {
  // If no movie is selected to be shown in the modal popup, return nothing
  if (!movie) return null;

  // Check if this specific movie is currently inside the watchlist array
  const isSaved = watchlist?.some(m => m._id === movie._id);
  const isCriticsPick = movie.rating >= 8.0;

  return (
    <Modal isOpen={!!movie} onClose={onClose} className="flex flex-col md:flex-row gap-6">
      {/* Left Hand Column Side: Image Cover view */}
      <div className="w-full md:w-64 h-80 md:h-[380px] bg-zinc-800 y2k-border overflow-hidden shrink-0 flex items-center justify-center">
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-4 text-mdb-taupe">
            <span className="text-sm font-semibold block">No Poster View</span>
          </div>
        )}
      </div>

      {/* Right Hand Column Side: Data Content and Text fields */}
      <div className="flex flex-col justify-between flex-grow mt-4 md:mt-0">
        <div>
          {isCriticsPick && (
            <p className="blink-text text-mdb-yellow font-display text-xs mb-1">★ CRITIC'S PICK ★</p>
          )}
          <h1 className="text-2xl md:text-3xl font-display y2k-gradient-text mb-1 pr-8">{movie.title}</h1>

          <div className="flex gap-4 items-center text-xs font-bold mb-4 mt-2 font-body flex-wrap">
            <span className="flex items-center gap-1 text-mdb-void bg-mdb-yellow y2k-border px-2 py-0.5">
              ★ {movie.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-mdb-taupe">
              <Calendar className="h-3.5 w-3.5 y2k-icon" /> {movie.year}
            </span>
            <span className="text-mdb-taupe y2k-border px-2 py-0.5">
              {movie.genre}
            </span>
          </div>

          {/* Synopsis Section Summary */}
          <h3 className="text-xs font-display text-mdb-cyan mb-1.5">Synopsis</h3>
          <p className="font-comic text-mdb-taupe text-sm leading-relaxed mb-4">
            {movie.synopsis || "No description provided yet."}
          </p>

          {/* Cast List Section Container mapper */}
          <h3 className="text-xs font-display text-mdb-cyan mb-2">Principal Cast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {movie.cast && movie.cast.map((actor, idx) => (
              <div key={idx} className="flex items-center gap-3 y2k-border p-2">
                <div className="bg-mdb-cream/10 p-1 rounded-full text-mdb-lime">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-mdb-cream font-body">{actor.name}</p>
                  <p className="text-[11px] text-mdb-taupe italic">{actor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist Handler Action Switch */}
        <button
          onClick={() => onToggleWatchlist(movie)}
          className="y2k-btn mt-6 w-full font-display text-mdb-void py-2.5 text-sm"
          style={isSaved ? { background: 'linear-gradient(180deg, #ff5c8a, #dc2626)', color: '#fff' } : undefined}
        >
          {isSaved ? '✕ Remove From Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </Modal>
  );
}
