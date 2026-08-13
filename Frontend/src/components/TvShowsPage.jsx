import React from 'react';

export default function TvShowsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="y2k-panel p-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
          }}
        />
        <h1 className="text-3xl md:text-4xl font-display y2k-gradient-text mb-4 relative">
          📺 TV Shows
        </h1>
        <p className="blink-text font-display text-mdb-yellow text-lg mb-6 relative">
          UNDER CONSTRUCTION
        </p>
        <div className="marquee y2k-border bg-mdb-void py-2 mb-6 relative">
          <span className="font-body text-mdb-cyan text-sm">
            🎬 TV SHOWS COMING SOON 🎬 PLEASE STAND BY 🎬 CHECK BACK LATER 🎬
          </span>
        </div>
        <p className="font-comic text-mdb-taupe text-sm relative">
          Our engineers (a guy with a VCR) are working hard to bring you the TV Shows section.
        </p>
      </div>
    </main>
  );
}
