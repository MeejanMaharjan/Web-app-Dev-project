import React, { useState } from 'react';
import { Send, CheckCircle, X } from 'lucide-react';

export default function MovieRequestForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ title: '', year: '', genre: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    console.log('Movie Request Submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({ title: '', year: '', genre: '', reason: '' });
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Dark overlay backdrop click closer */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="bg-mdb-blue text-mdb-cream p-6 rounded-lg shadow-xl max-w-2xl w-full border border-mdb-taupe/20 relative z-10 transform scale-100 transition-all">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-mdb-taupe hover:text-mdb-cream transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-bold mb-2 text-mdb-green">Can't find a movie?</h3>
        <p className="text-sm text-mdb-taupe mb-6">Submit a request to add it to the MDB database.</p>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-mdb-green">
            <CheckCircle className="h-14 w-14 mb-2 stroke-[2] animate-bounce" />
            <p className="font-semibold text-lg">Thank you!</p>
            <p className="text-sm text-mdb-taupe">Your request has been sent to our moderators.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-mdb-taupe mb-1">Movie Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Inception"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-mdb-cream/10 text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 rounded border border-mdb-cream/20 focus:outline-none focus:ring-2 focus:ring-mdb-green"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-mdb-taupe mb-1">Release Year</label>
                <input
                  type="number"
                  placeholder="e.g., 2010"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-mdb-cream/10 text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 rounded border border-mdb-cream/20 focus:outline-none focus:ring-2 focus:ring-mdb-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-mdb-taupe mb-1">Genre</label>
              <input
                type="text"
                placeholder="e.g., Sci-Fi, Thriller"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full bg-mdb-cream/10 text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 rounded border border-mdb-cream/20 focus:outline-none focus:ring-2 focus:ring-mdb-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-mdb-taupe mb-1">Why should we add it?</label>
              <textarea
                rows="3"
                placeholder="Tell us a bit about this film..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full bg-mdb-cream/10 text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 rounded border border-mdb-cream/20 focus:outline-none focus:ring-2 focus:ring-mdb-green resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-mdb-green hover:bg-opacity-90 text-mdb-blue font-bold py-2.5 px-4 rounded transition-all flex items-center justify-center gap-2 text-sm shadow"
            >
              <Send className="h-4 w-4" />
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}