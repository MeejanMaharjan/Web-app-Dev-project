import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Film, Tv, Clapperboard, LogIn, UserPlus, LogOut, ChevronDown, User, ShieldCheck } from 'lucide-react';

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
    <>
      <div className="marquee bg-mdb-void text-mdb-yellow py-1 border-b-2 border-mdb-hotpink">
        <span className="font-body text-xs font-bold tracking-wide">
          🎬 NOW PLAYING ON MOMENTDB 🎬 ADD YOUR FAVORITE MOVIES 🎬 BUILD YOUR ULTIMATE WATCHLIST 🎬
        </span>
      </div>
      <nav
        className="text-mdb-cream sticky top-0 z-40"
        style={{
          background: 'repeating-linear-gradient(90deg, var(--color-mdb-purple), var(--color-mdb-purple) 20px, var(--color-mdb-blue) 20px, var(--color-mdb-blue) 40px)',
          boxShadow: '0 4px 0 var(--color-mdb-hotpink)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link to="/" className="sparkle-hover flex items-center gap-2 font-display text-xl shrink-0">
            <Clapperboard className="h-6 w-6 stroke-[2.5] text-mdb-lime" />
            <span className="y2k-gradient-text">MOMENTDB</span>
          </Link>

          {/* Search Bar */}
          <div className="max-w-md w-full relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe group-focus-within:text-mdb-lime transition-colors" />
            <input
              type="text"
              placeholder="Search titles, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="y2k-border w-full bg-mdb-void pl-10 pr-4 py-1.5 text-sm focus:outline-none transition-all text-mdb-cream placeholder-mdb-taupe/60 font-body"
            />
          </div>

          {/* Nav Links + Auth */}
          <div className="flex items-center gap-1 sm:gap-3 font-bold text-sm shrink-0">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors font-body ${
                location.pathname === '/' ? 'y2k-border bg-mdb-void text-mdb-lime' : 'hover:text-mdb-lime'
              }`}
            >
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">Movies</span>
            </Link>

            <Link
              to="/tv-shows"
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors font-body ${
                location.pathname === '/tv-shows' ? 'y2k-border bg-mdb-void text-mdb-lime' : 'hover:text-mdb-lime'
              }`}
            >
              <Tv className="h-4 w-4" />
              <span className="hidden sm:inline">TV Shows</span>
            </Link>

            <Link
              to="/watchlist"
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors font-body ${
                location.pathname === '/watchlist' ? 'y2k-border bg-mdb-void text-mdb-lime' : 'hover:text-mdb-lime'
              }`}
            >
              <span className="relative">Watchlist</span>
            </Link>

            {currentUser?.isAdmin && (
              <Link
                to="/admin/requests"
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors font-body ${
                  location.pathname === '/admin/requests' ? 'y2k-border bg-mdb-void text-mdb-lime' : 'hover:text-mdb-lime'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Requests</span>
              </Link>
            )}

            {/* Auth section */}
            {currentUser ? (
              <div className="relative ml-1">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="y2k-btn flex items-center gap-1.5 px-3 py-1.5 text-mdb-void font-body"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </button>

                {menuOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    {/* Dropdown */}
                    <div className="y2k-panel absolute right-0 top-full mt-2 w-48 overflow-hidden z-20">
                      <div className="px-4 py-3 border-b-2 border-mdb-taupe/30">
                        <p className="text-xs text-mdb-taupe font-body">Signed in as</p>
                        <p className="text-sm font-bold text-mdb-cream truncate font-body">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-mdb-hotpink hover:bg-mdb-void transition-colors font-body"
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors font-body ${
                    location.pathname === '/login' ? 'y2k-border bg-mdb-void text-mdb-lime' : 'hover:text-mdb-lime'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="y2k-btn flex items-center gap-1.5 px-3 py-1.5 text-mdb-void font-body"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
