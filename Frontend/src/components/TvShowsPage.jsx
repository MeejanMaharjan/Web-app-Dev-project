import React, { useState, useEffect } from 'react';
import { getTvShows } from '../api/TvShowApi';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

export default function TvShowsPage({ watchlist, onToggleWatchlist }) {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await getTvShows();
        setShows(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Could not load TV shows. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    }
    fetchShows();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-xl font-display mb-6 text-mdb-cream border-b-4 border-mdb-cyan pb-2 flex justify-between items-center">
        <span>
          <span className="blink-text text-mdb-yellow">★</span> TV SHOWS <span className="blink-text text-mdb-yellow">★</span>
        </span>
        <span className="text-xs font-normal font-body text-mdb-taupe">{shows.length} showing</span>
      </h2>

      {error ? (
        <div className="y2k-border p-4 bg-mdb-hotpink/20 text-mdb-yellow text-sm font-body max-w-md mx-auto mt-8 text-center">
          {error}
        </div>
      ) : isLoading ? (
        <div className="y2k-panel text-center mt-16 p-8 max-w-md mx-auto text-mdb-cream">
          <p className="font-display text-lg blink-text">Loading titles...</p>
        </div>
      ) : shows.length === 0 ? (
        <div className="y2k-panel text-center mt-16 p-8 max-w-md mx-auto text-mdb-cream">
          <p className="font-display text-lg mb-1">No TV shows yet</p>
          <p className="text-xs text-mdb-taupe font-body">Check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {shows.map((show) => (
            <MovieCard
              key={show._id}
              movie={show}
              onSelect={() => setSelectedShow(show)}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
              currentUser={null}
            />
          ))}
        </div>
      )}

      <MovieDetails
        movie={selectedShow}
        onClose={() => setSelectedShow(null)}
        watchlist={watchlist}
        onToggleWatchlist={onToggleWatchlist}
      />
    </main>
  );
}
