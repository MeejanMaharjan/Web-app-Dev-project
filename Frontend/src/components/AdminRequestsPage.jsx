import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { getMovieRequests, updateMovieRequestStatus } from '../api/MovieApi';

const statusColor = {
  pending: 'bg-mdb-yellow text-mdb-void',
  approved: 'bg-mdb-lime text-mdb-void',
  rejected: 'bg-mdb-hotpink text-white',
};

export default function AdminRequestsPage({ currentUser }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser?.isAdmin) return;

    async function fetchRequests() {
      try {
        const response = await getMovieRequests();
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load movie requests.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequests();
  }, [currentUser]);

  const handleSetStatus = async (id, status) => {
    try {
      const response = await updateMovieRequestStatus(id, status);
      const updated = response.data.request;
      setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update request status.');
    }
  };

  if (!currentUser?.isAdmin) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="y2k-panel p-8 text-center text-mdb-cream">
          <p className="font-display text-xl text-mdb-hotpink mb-2">🚫 Access Denied</p>
          <p className="font-comic text-mdb-taupe text-sm">You need admin privileges to view this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-display y2k-gradient-text mb-6 border-b-4 border-mdb-hotpink pb-2">
        Movie Requests ({requests.length})
      </h2>

      {isLoading ? (
        <p className="text-mdb-taupe font-body">Loading requests...</p>
      ) : error ? (
        <div className="y2k-border p-3 bg-mdb-hotpink/20 text-mdb-yellow text-sm font-body">{error}</div>
      ) : requests.length === 0 ? (
        <div className="y2k-panel text-center mt-16 p-12 max-w-lg mx-auto flex flex-col items-center">
          <span className="text-6xl mb-4">📭</span>
          <p className="text-mdb-cream font-display text-xl mb-1">No requests yet</p>
          <p className="text-sm text-mdb-taupe font-body">Movie suggestions submitted by users will show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="y2k-panel p-4 text-mdb-cream">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-display text-mdb-lime">{req.title}</h3>
                <span className={`y2k-border text-[10px] font-bold uppercase px-2 py-0.5 shrink-0 font-body ${statusColor[req.status] || statusColor.pending}`}>
                  {req.status}
                </span>
              </div>
              <div className="flex gap-3 text-xs text-mdb-taupe font-body mb-2">
                {req.year && <span>{req.year}</span>}
                {req.genre && <span>{req.genre}</span>}
              </div>
              {req.reason && (
                <p className="font-comic text-sm text-mdb-taupe leading-relaxed mb-2">{req.reason}</p>
              )}
              <p className="text-[11px] text-mdb-taupe/60 font-body mb-2">
                Submitted {new Date(req.createdAt).toLocaleString()}
              </p>
              {req.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSetStatus(req._id, 'approved')}
                    className="y2k-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 text-mdb-void font-display text-xs"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleSetStatus(req._id, 'rejected')}
                    className="y2k-border flex-1 flex items-center justify-center gap-1.5 py-1.5 text-mdb-hotpink font-display text-xs hover:bg-mdb-hotpink/20 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
