import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Modal from './Modal';
import { addMovie, updateMovie } from '../api/MovieApi';

const emptyForm = { title: '', genre: '', year: '', rating: '', poster_url: '', synopsis: '' };

export default function MovieForm({ isOpen, onClose, movie, onSaved }) {
  const isEditing = Boolean(movie);
  const [formData, setFormData] = useState(() =>
    movie
      ? {
          title: movie.title || '',
          genre: movie.genre || '',
          year: movie.year ?? '',
          rating: movie.rating ?? '',
          poster_url: movie.poster_url || '',
          synopsis: movie.synopsis || '',
        }
      : emptyForm
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const payload = {
      ...formData,
      year: Number(formData.year),
      rating: Number(formData.rating),
    };
    try {
      const response = isEditing ? await updateMovie(movie._id, payload) : await addMovie(payload);
      onSaved(response.data.movie);
      setFormData(emptyForm);
      onClose();
    } catch (err) {
      const apiError = err.response?.data;
      setError(apiError?.errors?.[0]?.msg || apiError?.error || 'Failed to save movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <h3 className="text-xl font-display y2k-gradient-text mb-2">
        {isEditing ? 'Edit Movie' : 'Add a New Movie'}
      </h3>
      <p className="text-sm font-comic text-mdb-taupe mb-6">
        {isEditing ? 'Update the catalog entry.' : 'Add a new title straight to the MDB catalog.'}
      </p>

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
            <label className="block text-xs font-display text-mdb-cyan mb-1">Release Year *</label>
            <input
              type="number"
              required
              placeholder="e.g., 2010"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-display text-mdb-cyan mb-1">Genre *</label>
            <input
              type="text"
              required
              placeholder="e.g., Sci-Fi, Thriller"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-display text-mdb-cyan mb-1">Rating (0-10) *</label>
            <input
              type="number"
              required
              min="0"
              max="10"
              step="0.1"
              placeholder="e.g., 8.2"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-display text-mdb-cyan mb-1">Poster URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={formData.poster_url}
            onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
            className="y2k-border w-full bg-mdb-void text-mdb-cream placeholder-mdb-taupe/50 px-3 py-2 font-body focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-display text-mdb-cyan mb-1">Synopsis</label>
          <textarea
            rows="3"
            placeholder="What's it about?"
            value={formData.synopsis}
            onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
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
            <Save className="h-4 w-4" />
          )}
          {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Movie'}
        </button>
      </form>
    </Modal>
  );
}
