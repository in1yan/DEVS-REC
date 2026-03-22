'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const EventModal = ({ isOpen, onClose, event }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Animate modal in
      gsap.fromTo(
        '.modal-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.modal-content',
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    // Animate modal out
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    });
    gsap.to('.modal-content', {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}>
      <div className="modal-content relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors duration-200"
          aria-label="Close modal">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Event Image */}
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.img})` }}
        />

        {/* Event Details */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {event.description}
          </p>
          
          {/* Action Button */}
          <div className="flex gap-4">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Learn More
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <button
              onClick={handleClose}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
