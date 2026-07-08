import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import MovieRequestForm from './components/MovieRequestForm';
import WatchlistPage from './components/WatchlistPage';
import { Plus, BarChart3, Star, Clapperboard } from 'lucide-react';

const SAMPLE_MOVIES = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    poster_url: null,
    synopsis: "A prominent banker unjustly convicted of murder is sentenced to life imprisonment at the Shawshank prison. He finds unique ways to deal with his new, harsh life, befriending a fellow inmate named Red over the course of several decades.",
    cast: [
      { name: "Tim Robbins", role: "Andy Dufresne" },
      { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding" }
    ]
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    genre: "Action, Sci-Fi",
    year: 2021,
    rating: 8.2,
    poster_url: null,
    synopsis: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other multiverses start to bleed through.",
    cast: [
      { name: "Tom Holland", role: "Peter Parker" },
      { name: "Zendaya", role: "MJ" }
    ]
  },
  {
    id: 3,
    title: "The Hobbit: An Unexpected Journey",
    genre: "Fantasy, Adventure",
    year: 2012,
    rating: 7.8,
    poster_url: null,
    synopsis: "A reluctant Hobbit, Bilbo Baggins, is swept away into an epic, mystical quest to reclaim the lonely mountain Kingdom of Erebor from the fearsome dragon Smaug.",
    cast: [
      { name: "Martin Freeman", role: "Bilbo Baggins" },
      { name: "Ian McKellen", role: "Gandalf" }
    ]
  },
  {
    id: 4,
    title: "Mystery Project X",
    genre: "Thriller, Indie",
    year: 2025,
    rating: 6.4,
    poster_url: null,
    synopsis: "Deep within an isolated tech incubator, an anonymous group of web engineers accidentally deploy an artificial intelligence framework.",
    cast: [
      { name: "Alex Demery", role: "Lead Dev" }
    ]
  },
  {
    id: 5,
    title: "Disastrous Movie 3D",
    genre: "Comedy",
    year: 2008,
    rating: 1.9,
    poster_url: null,
    synopsis: "An over-the-top satirical parody targeting various high-profile blockbusters, natural disaster thrillers, and pop-culture icons.",
    cast: [
      { name: "Matt Lanter", role: "Will" }
    ]
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // 4. Watchlist State Array
  const [watchlist, setWatchlist] = useState([]);

  // 6. Dashboard metrics state variables
  const [totalMovies, setTotalMovies] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  // 6. useEffect: Compute summary metrics whenever movie dataset changes
  useEffect(() => {
    if (SAMPLE_MOVIES.length === 0) {
      setTotalMovies(0);
      setAvgRating(0);
      return;
    }

    const total = SAMPLE_MOVIES.length;
    const sumRatings = SAMPLE_MOVIES.reduce((acc, curr) => acc + curr.rating, 0);
    const calculatedAverage = sumRatings / total;

    setTotalMovies(total);
    setAvgRating(calculatedAverage);
  }, []); // Fires once when component mounts (or when your core data arrays shift)

  // 4. Watchlist Add/Remove handler function
  const toggleWatchlist = (movie) => {
    if (watchlist.some(m => m.id === movie.id)) {
      setWatchlist(watchlist.filter(m => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  // 5. Live search query logic filter matching on titles
  const filteredMovies = SAMPLE_MOVIES.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HomeGrid = () => (
    <main className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Dashboard Statistics Banner component element block */}
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
            <h4 className="text-2xl font-black">{watchlist.length} Pick{watchlist.length === 1 ? '' : 's'}</h4>
          </div>
        </div>
      </section>

      <h2 className="text-xl font-black mb-6 text-mdb-blue border-b-2 border-mdb-taupe pb-2 flex justify-between items-center">
        <span>{searchQuery ? `Search Results for "${searchQuery}"` : "Featured Spotlights"}</span>
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
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <Routes>
          <Route path="/" element={<HomeGrid />} />
          <Route path="/tv-shows" element={<div className="p-12 text-center text-lg font-semibold">TV Shows Section</div>} />
          <Route 
            path="/watchlist" 
            element={
              <WatchlistPage 
                watchlist={watchlist} 
                onSelectMovie={(movie) => setSelectedMovie(movie)} 
                onToggleWatchlist={toggleWatchlist} // Pass down to allow removal right from watchlist grid view
              />
            } 
          />
        </Routes>

        {/* Floating Add Movie button */}
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