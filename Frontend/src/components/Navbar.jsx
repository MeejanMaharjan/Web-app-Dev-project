import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Film, Tv, Clapperboard, LogIn, UserPlus, LogOut, ChevronDown, User } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, currentUser, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-mdb-blue text-mdb-cream shadow-md border-b border-mdb-taupe/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-mdb-green shrink-0">
          <Clapperboard className="h-6 w-6 stroke-[2.5]" />
          <span>MOMENT<span className="text-mdb-cream">DB</span></span>
        </Link>

        {/* Search Bar */}
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

        {/* Nav Links + Auth */}
        <div className="flex items-center gap-1 sm:gap-3 font-bold text-sm shrink-0">
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

          <Link
            to="/watchlist"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              location.pathname === '/watchlist' ? 'text-mdb-green bg-mdb-cream/5' : 'hover:text-mdb-green'
            }`}
          >
            <span className="relative">Watchlist</span>
          </Link>

          {/* Auth section */}
          {currentUser ? (
            <div className="relative ml-1">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-mdb-cream/10 hover:bg-mdb-cream/20 transition-colors"
              >
                <User className="h-4 w-4 text-mdb-green" />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-mdb-taupe/20 overflow-hidden z-20">
                    <div className="px-4 py-3 border-b border-mdb-taupe/10">
                      <p className="text-xs text-mdb-blue/50 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-mdb-blue truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 ml-1">
              <Link
                to="/login"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  location.pathname === '/login' ? 'text-mdb-green bg-mdb-cream/5' : 'hover:text-mdb-green'
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-mdb-green text-mdb-blue hover:bg-mdb-green/90 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
