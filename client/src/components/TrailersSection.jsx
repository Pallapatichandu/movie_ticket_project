// import React, { useState } from 'react'
// import { dummyTrailers } from '../assets/assets'
// import ReactPlayer from 'react-player'
// import BlueCircle from './BlueCircle'
// import { PlayCircleIcon } from 'lucide-react'

// export const TrailersSection = () => {
//     const [currentTrailer,setCurrentTrailer]=useState(dummyTrailers[0])
//   return (
//     <div className='px-6 md:px-16 lg:px-24 xl:px-24 xl:px-44 py-20 overflow-hidden'>
//       <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'></p>
//       <div className='relative mt-6'>
//         <BlueCircle top='-100px right="100px'/>
//        <ReactPlayer url={currentTrailer.videoUrl} color={false} className='mx-auto max-w-full' width="960px" height="540px" />
//       </div>
//       <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
//        {
//         dummyTrailers.map((trailer)=>(
//             <div key={trailer.image} className='relative group-hover:not-hoveropacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer 'onClick={()=>setCurrentTrailer(trailer)}>
//                 <img src={trailer.image} alt="tailer" className='rounded-lg w-full h-full object-cover brightness-75' />
//                 <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:w-8 h-5 md:h-12 transform-translate-x-1/2-translate-y-1/2'/>
//             </div>

//         ))
//        }
//       </div>
//     </div>
//   )
// }
// import React, { useState } from 'react';
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
