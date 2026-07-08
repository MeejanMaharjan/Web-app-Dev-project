import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Film, Tv, Clapperboard } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();

  return (
    <nav className="bg-mdb-blue text-mdb-cream shadow-md border-b border-mdb-taupe/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo Link */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-mdb-green shrink-0">
          <Clapperboard className="h-6 w-6 stroke-[2.5]" />
          <span>MOMENT<span className="text-mdb-cream">DB</span></span>
        </Link>

        {/* Search Input Bar Field */}
        <div className="max-w-md w-full relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe group-focus-within:text-mdb-green transition-colors" />
          <input
            type="text"
            placeholder="Search titles, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mdb-cream/5 border border-mdb-taupe/30 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-mdb-green focus:bg-mdb-cream/10 transition-all text-mdb-cream placeholder-mdb-taupe/60"
          />
        </div>

        {/* Navigation Destination Link Routes */}
        <div className="flex items-center gap-1 sm:gap-4 font-bold text-sm shrink-0">
          <Link 
            to="/" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              location.pathname === '/' ? 'text-mdb-green bg-mdb-cream/5' : 'hover:text-mdb-green'
            }`}
          >
            <Film className="h-4 w-4" />
            <span className="hidden sm:inline">Movies</span>
          </Link>

          <Link 
            to="/tv-shows" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              location.pathname === '/tv-shows' ? 'text-mdb-green bg-mdb-cream/5' : 'hover:text-mdb-green'
            }`}
          >
            <Tv className="h-4 w-4" />
            <span className="hidden sm:inline">TV Shows</span>
          </Link>

          {/*  Updated Watchlist Router Link Link element */}
          <Link 
            to="/watchlist" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              location.pathname === '/watchlist' ? 'text-mdb-green bg-mdb-cream/5' : 'hover:text-mdb-green'
            }`}
          >
            <span className="relative">
              Watchlist
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}