// import React from 'react'

// const Tittle = ({text1,text2}) => {
//   return (
//     <h1 className='font-medium text-2xl'>
//         {text1} <span className='underline text-primary'>{text2}</span>
        
//     </h1>
//   )
// }

// export default Tittle
import React from 'react';

const Tittle = ({ text1, text2 }) => {
  return (
    <h1 className="fw-semibold fs-2 mb-4 text-white">
      {text1}{' '}
      <span className="text-primary text-decoration-underline">
        {text2}
      </span>
    </h1>
  );
};

export default Tittle;

