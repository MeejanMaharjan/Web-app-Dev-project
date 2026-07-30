import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import MovieRequestForm from './components/MovieRequestForm';
import WatchlistPage from './components/WatchlistPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { getMovies } from './api/MovieApi';
import { Plus, BarChart3, Star, Clapperboard } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  // Auth state — persist to sessionStorage so a refresh keeps the user logged in
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('momentdb_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem('momentdb_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('momentdb_user');
  };

  useEffect(() => {
    if (movies.length === 0) {
      setTotalMovies(0);
      setAvgRating(0);
      return;
    }
    const total = movies.length;
    const sumRatings = movies.reduce((acc, curr) => acc + curr.rating, 0);
    setTotalMovies(total);
    setAvgRating(sumRatings / total);
  }, [movies]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        setError((prev) => [...prev, error]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const toggleWatchlist = (movie) => {
    if (watchlist.some((m) => m.id === movie.id)) {
      setWatchlist(watchlist.filter((m) => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HomeGrid = () => (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-mdb-blue p-5 rounded-xl border border-mdb-taupe/10 shadow-sm text-mdb-cream">
        <div className="flex items-center gap-4 border-r border-mdb-taupe/20 last:border-0 pr-4">
          <div className="p-3 bg-mdb-cream/5 rounded-lg text-mdb-green">
            <Clapperboard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider">Total Catalog</p>
            <h4 className="text-2xl font-black">{totalMovies} Titles</h4>
          </div>
        </div>

        <div className="flex items-center gap-4 border-r border-mdb-taupe/20 last:border-0 pr-4">
          <div className="p-3 bg-mdb-cream/5 rounded-lg text-amber-400">
            <Star className="h-6 w-6 fill-current" />
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider">Average Rating</p>
            <h4 className="text-2xl font-black">{avgRating.toFixed(1)} / 10</h4>
          </div>
        </div>

        <div className="flex items-center gap-4 last:border-0">
          <div className="p-3 bg-mdb-cream/5 rounded-lg text-mdb-green">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider">Saved Watchlist</p>
            <h4 className="text-2xl font-black">
              {watchlist.length} Pick{watchlist.length === 1 ? '' : 's'}
            </h4>
          </div>
        </div>
      </section>

      <h2 className="text-xl font-black mb-6 text-mdb-blue border-b-2 border-mdb-taupe pb-2 flex justify-between items-center">
        <span>{searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Spotlights'}</span>
        <span className="text-xs font-normal text-mdb-blue/60">{filteredMovies.length} showing</span>
      </h2>

      {filteredMovies.length === 0 ? (
        <div className="text-center mt-16 p-8 bg-mdb-blue/5 rounded-xl max-w-md mx-auto border border-mdb-taupe/10">
          <p className="text-mdb-blue font-semibold text-lg mb-1">No matches found</p>
          <p className="text-xs text-mdb-blue/60">Try adjustments to your search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={() => setSelectedMovie(movie)}
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          ))}
        </div>
      )}
    </main>
  );

  return (
    <Router>
      <div className="bg-mdb-cream min-h-screen font-sans text-mdb-blue relative pb-16">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<HomeGrid />} />
          <Route path="/tv-shows" element={<div className="p-12 text-center text-lg font-semibold">TV Shows Section</div>} />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlist={watchlist}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onToggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        </Routes>

        <button
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-mdb-blue hover:bg-opacity-95 text-mdb-cream p-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-bold group border border-mdb-taupe/20"
        >
          <Plus className="h-6 w-6 text-mdb-green stroke-[3]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm whitespace-nowrap">
            Add Movie
          </span>
        </button>

        <MovieRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          watchlist={watchlist}
          onToggleWatchlist={toggleWatchlist}
        />
      </div>
    </Router>
  );
}
