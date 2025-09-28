
import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import { PlayCircle } from 'lucide-react';

export const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="container py-5">
      {/* Display current trailer title */}
      <p className="text-muted text-center mb-4 fs-5">
        {currentTrailer.title || "Trailer"}
      </p>

      {/* Video Player */}
      <div className="d-flex justify-content-center mb-4">
        <div style={{ maxWidth: '960px', width: '100%' }}>
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls
            playing={false}
            width="100%"
            height="540px"
            className="rounded"
          />
        </div>
      </div>

      {/* Trailer Thumbnails */}
      <div className="row row-cols-2 row-cols-md-4 g-3 justify-content-center">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="col position-relative"
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt={trailer.title || "trailer"}
              className="img-fluid rounded"
              style={{
                height: '240px',
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
        ))}
      </div>
    </div>
  );
};
