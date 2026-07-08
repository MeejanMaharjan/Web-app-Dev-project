import React from 'react';
import { Star, Calendar, User, X } from 'lucide-react';

export default function MovieDetails({ movie, onClose, watchlist, onToggleWatchlist }) {
  // If no movie is selected to be shown in the modal popup, return nothing
  if (!movie) return null;

  // Check if this specific movie is currently inside the watchlist array
  const isSaved = watchlist?.some(m => m.id === movie.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      {/* Background Dim Backdrop - Clicking it closes the modal popup */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Modal Card Surface Container */}
      <div className="bg-mdb-blue text-mdb-cream p-6 rounded-xl shadow-2xl max-w-4xl w-full border border-mdb-taupe/10 relative z-10 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-6 animate-scale-up">
        
        {/* Top Right Close Button Window Control handle */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-mdb-taupe hover:text-mdb-cream transition-colors z-20"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Left Hand Column Side: Image Cover view */}
        <div className="w-full md:w-64 h-80 md:h-[380px] bg-zinc-800 rounded-lg overflow-hidden shadow-md shrink-0 flex items-center justify-center">
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
            <h1 className="text-2xl md:text-3xl font-black text-mdb-green mb-1 pr-8">{movie.title}</h1>
            
            <div className="flex gap-4 items-center text-xs font-semibold mb-4 mt-2">
              <span className="flex items-center gap-1 text-mdb-green bg-mdb-cream/10 px-2 py-0.5 rounded">
                <Star className="h-3.5 w-3.5 fill-current" /> {movie.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 text-mdb-taupe">
                <Calendar className="h-3.5 w-3.5" /> {movie.year}
              </span>
              <span className="text-mdb-taupe bg-mdb-cream/5 border border-mdb-cream/10 px-2 py-0.5 rounded">
                {movie.genre}
              </span>
            </div>

            {/* Synopsis Section Summary */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-mdb-green mb-1.5">Synopsis</h3>
            <p className="text-mdb-taupe text-sm leading-relaxed mb-4">
              {movie.synopsis || "No description provided yet."}
            </p>

            {/* Cast List Section Container mapper */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-mdb-green mb-2">Principal Cast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {movie.cast && movie.cast.map((actor, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-mdb-cream/5 p-2 rounded border border-mdb-cream/10">
                  <div className="bg-mdb-cream/10 p-1 rounded-full text-mdb-green">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-mdb-cream">{actor.name}</p>
                    <p className="text-[11px] text-mdb-taupe italic">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist Handler Action Switch */}
          <button 
            onClick={() => onToggleWatchlist(movie)}
            className={`mt-6 w-full font-black py-2.5 rounded text-sm transition-all shadow ${
              isSaved 
                ? 'bg-rose-600 text-white hover:bg-rose-700' 
                : 'bg-mdb-green hover:bg-opacity-90 text-mdb-blue'
            }`}
          >
            {isSaved ? '✕ Remove From Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>

      </div>
    </div>
  );
}