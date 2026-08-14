import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import MovieRequestForm from './components/MovieRequestForm';
import MovieForm from './components/MovieForm';
import WatchlistPage from './components/WatchlistPage';
import TvShowsPage from './components/TvShowsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminRequestsPage from './components/AdminRequestsPage';
import { getMovies, deleteMovie } from './api/MovieApi';
import { getCurrentUser, logoutUser } from './api/AuthApi';
import { Plus, BarChart3, Clapperboard } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 50;

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

  // Revalidate the cached sessionStorage user against the server, since sessionStorage
  // is client-editable and must never be trusted for admin gating on its own.
  useEffect(() => {
    if (!currentUser) return;
    async function revalidate() {
      try {
        const response = await getCurrentUser();
        handleLogin(response.data.data);
      } catch {
        handleLogout();
      }
    }
    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Clear the client session regardless — the cookie expires on its own within the hour.
    }
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
      } catch (err) {
        setError(err.response?.data?.error || 'Could not load movies. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setIsMovieFormOpen(true);
  };

  const handleAddMovie = () => {
    setEditingMovie(null);
    setIsMovieFormOpen(true);
  };

  const handleMovieSaved = (movie) => {
    setMovies((prev) => {
      const exists = prev.some((m) => m._id === movie._id);
      return exists ? prev.map((m) => (m._id === movie._id ? movie : m)) : [movie, ...prev];
    });
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
      setWatchlist((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete movie.');
    }
  };

  const toggleWatchlist = (movie) => {
    if (watchlist.some((m) => m._id === movie._id)) {
      setWatchlist(watchlist.filter((m) => m._id !== movie._id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedMovies = filteredMovies.slice(
    (safePage - 1) * MOVIES_PER_PAGE,
    safePage * MOVIES_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1, 2, 3];
    if (safePage > 4) {
      pages.push('...');
    } else {
      pages.push(4);
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    return pages;
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center items-center gap-2 mt-8 font-display text-sm">
        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="text-mdb-taupe px-1">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 y2k-border transition-colors ${
                page === safePage
                  ? 'bg-mdb-lime text-mdb-void'
                  : 'text-mdb-cream hover:bg-mdb-cream/10'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    );
  };

  const HomeGrid = () => (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-mdb-cream">
        <div className="y2k-panel flex items-center gap-4 p-4">
          <div className="text-mdb-lime">
            <Clapperboard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider font-body">Total Catalog</p>
            <h4 className="text-2xl font-display">{totalMovies} Titles</h4>
          </div>
        </div>

        <div className="y2k-panel flex items-center gap-4 p-4">
          <div className="text-mdb-yellow">
            <span className="text-2xl">★</span>
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider font-body">Average Rating</p>
            <h4 className="text-2xl font-display">{avgRating.toFixed(1)} / 10</h4>
          </div>
        </div>

        <div className="y2k-panel flex items-center gap-4 p-4">
          <div className="text-mdb-lime">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-mdb-taupe uppercase font-bold tracking-wider font-body">Saved Watchlist</p>
            <h4 className="text-2xl font-display">
              {watchlist.length} Pick{watchlist.length === 1 ? '' : 's'}
            </h4>
          </div>
        </div>
      </section>

      <h2 className="text-xl font-display mb-6 text-mdb-cream border-b-4 border-mdb-cyan pb-2 flex justify-between items-center">
        <span>
          {searchQuery ? (
            `Search Results for "${searchQuery}"`
          ) : (
            <>
              <span className="blink-text text-mdb-yellow">★</span> SPOTLIGHTS <span className="blink-text text-mdb-yellow">★</span>
            </>
          )}
        </span>
        <span className="text-xs font-normal font-body text-mdb-taupe">{filteredMovies.length} showing</span>
      </h2>

      {error ? (
        <div className="y2k-border p-4 bg-mdb-hotpink/20 text-mdb-yellow text-sm font-body max-w-md mx-auto mt-8 text-center">
          {error}
        </div>
      ) : isLoading ? (
        <div className="y2k-panel text-center mt-16 p-8 max-w-md mx-auto text-mdb-cream">
          <p className="font-display text-lg blink-text">Loading titles...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="y2k-panel text-center mt-16 p-8 max-w-md mx-auto text-mdb-cream">
          <p className="font-display text-lg mb-1">No matches found</p>
          <p className="text-xs text-mdb-taupe font-body">Try adjustments to your search keywords.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onSelect={() => setSelectedMovie(movie)}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
                currentUser={currentUser}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </main>
  );

  return (
    <Router>
      <div className="min-h-screen font-body text-mdb-cream relative pb-16">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<HomeGrid />} />
          <Route path="/tv-shows" element={<TvShowsPage />} />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlist={watchlist}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onToggleWatchlist={toggleWatchlist}
                currentUser={currentUser}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route path="/admin/requests" element={<AdminRequestsPage currentUser={currentUser} />} />
        </Routes>

        <button
          onClick={() => (currentUser?.isAdmin ? handleAddMovie() : setIsFormOpen(true))}
          className="y2k-btn sparkle-hover fixed bottom-6 left-6 z-40 text-mdb-void p-4 transition-all flex items-center gap-2 font-display group"
        >
          <Plus className="h-6 w-6 stroke-[3]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm whitespace-nowrap">
            {currentUser?.isAdmin ? 'Add Movie' : 'Request a Movie'}
          </span>
        </button>

        <MovieRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

        <MovieForm
          key={editingMovie?._id || 'new'}
          isOpen={isMovieFormOpen}
          onClose={() => setIsMovieFormOpen(false)}
          movie={editingMovie}
          onSaved={handleMovieSaved}
        />

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
