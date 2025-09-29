import React, { useState, useEffect } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import { PlayCircle } from 'lucide-react';

export const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  // Set body background and text color
  useEffect(() => {
    document.body.style.backgroundColor = "#0d1b2a"; // dark full-page background
    document.body.style.color = "#ffffff";           // text color
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <div
      className="container py-5 position-relative"
      style={{ minHeight: "100vh", zIndex: 1 }}
    >
      {/* Background Blur Circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(0,123,255,0.3)',
        filter: 'blur(100px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-50px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(255,0,123,0.2)',
        filter: 'blur(150px)',
        zIndex: 0,
      }} />

      {/* Display current trailer title */}
      <p className="text-center mb-4 fs-5 fw-semibold" style={{ position: 'relative', zIndex: 2 }}>
        {currentTrailer.title || "Trailer"}
      </p>

      {/* Video Player */}
      <div className="d-flex justify-content-center mb-4" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '960px', width: '100%' }}>
          <ReactPlayer
            src={currentTrailer.videoUrl}
            controls
            playing={false}
            width="100%"
            height="540px"
            className="rounded shadow-sm"
          />
        </div>
      </div>

      {/* Trailer Thumbnails */}
      <div className="row row-cols-2 row-cols-md-4 g-3 justify-content-center" style={{ position: 'relative', zIndex: 2 }}>
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="col position-relative"
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <div className="trailer-card h-100 shadow-sm rounded overflow-hidden">
              <img
                src={trailer.image}
                alt={trailer.title || "trailer"}
                className="img-fluid"
                style={{
                  height: '240px',
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.75)',
                  transition: 'transform 0.3s, filter 0.3s',
                }}
              />
              <PlayCircle
                strokeWidth={1.6}
                className="position-absolute top-50 start-50 translate-middle text-light"
                size={48}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for blur + hover */}
      <style>{`
        .trailer-card {
          background: rgba(13, 27, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          backdrop-filter: blur(12px);
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .trailer-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};
