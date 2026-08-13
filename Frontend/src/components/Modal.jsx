import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      {/* Background Dim Backdrop - Clicking it closes the modal popup */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Modal Card Surface Container */}
      <div className={`y2k-panel text-mdb-cream p-6 max-w-4xl w-full relative z-10 max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Top Right Close Button Window Control handle */}
        <button
          onClick={onClose}
          className="y2k-icon absolute top-4 right-4 text-mdb-cream hover:text-mdb-yellow transition-colors z-20"
        >
          <X className="h-6 w-6" />
        </button>

        {children}
      </div>
    </div>
  );
}
