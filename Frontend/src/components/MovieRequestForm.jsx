import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Modal from './Modal';
import { requestMovie } from '../api/MovieApi';

export default function MovieRequestForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ title: '', year: '', genre: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      await requestMovie(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ title: '', year: '', genre: '', reason: '' });
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <h3 className="text-xl font-display y2k-gradient-text mb-2">Can't find a movie?</h3>
      <p className="text-sm font-comic text-mdb-taupe mb-6">Submit a request to add it to the MDB database.</p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-mdb-lime">
          <CheckCircle className="h-14 w-14 mb-2 stroke-[2] animate-bounce" />
          <p className="font-display text-lg">Thank you!</p>
          <p className="text-sm font-comic text-mdb-taupe">Your request has been sent to our moderators.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="y2k-border p-3 bg-mdb-hotpink/20 text-mdb-yellow text-sm font-body">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1">Movie Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Inception"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1">Release Year</label>
              <input
                type="number"
                placeholder="e.g., 2010"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display text-mdb-cyan mb-1">Genre</label>
            <input
              type="text"
              placeholder="e.g., Sci-Fi, Thriller"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display text-mdb-cyan mb-1">Why should we add it?</label>
            <textarea
              rows="3"
              placeholder="Tell us a bit about this film..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="y2k-btn w-full text-mdb-void font-display py-2.5 px-4 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-mdb-void/30 border-t-mdb-void rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      )}
    </Modal>
  );
}
