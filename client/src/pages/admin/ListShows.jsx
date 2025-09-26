// import React, { useEffect, useState } from 'react'
// import { dummyShowsData } from '../../assets/assets'
// import Loading from '../../components/Loding'
// import Tittle from './Tittle'
// import dateFormate from '../../lib/dateFormat'

// const ListShows = () => {
//    const currency = import.meta.env.VITE_CURRENCY
//   const[Shows,setShows]=useState([])
//   const[loading,setLoading]=useState(true)
//   const getAllShow=async()=>{
//     try{
//       setShows([{
//         movies:dummyShowsData[0],
//         ShowsDateTime:'2025-06-30t02:00.000Z',
//         showPrice:59,
//         occupiedSeates:{
//           A1:"user_1",
//           B1:"user_2",
//           C1:"user_3"
//         }
//       }])
//       setLoading(false)
//     }catch(error){
//       console.log(error)

//     }
//   }
//   useEffect(()=>{
//      getAllShow()
//   },[])
//   return !loading ?(
//     <>
//     <Tittle text1="List" text2="Shows"/>
    // <div className='max-w-4xl mt-6 overflow-X-auto'>
    //   <table className='w-full border-collapse brounded-md overflow-hidden text-nowrap'>
    //     <thead>
    //       <tr className='bg-primary/20 text-left text-white'>
    //       <th className='p-2 font-medium pl-5'>Movie Name</th>
    //      <th className='p-2 font-medium pl-5'>Show Time</th>
    //      <th className='p-2 font-medium pl-5'>Total Booking</th>
    //      <th className='p-2 font-medium pl-5'>Earning</th>
    //      </tr>
    //     </thead>
        // <tbody>
        //   {
        //     Shows.map((show,index)=>(
        //       <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
        //         <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
        //         <td className='p-2'>{dateFormate(show.ShowsDateTime)}</td>
        //         <td className='p-2'>{Object.keys(show.occupiedSeates).length}</td>
        //         <td className='p-2'>{currency}  {Object.keys(show.occupiedSeates).length}</td>

        //       </tr>
        //     ))
        //   }
        // </tbody>
//       </table>

//     </div>
//     </>
//   ):<Loading/>
// }

// export default ListShows

import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loding';
import Tittle from './Tittle';
import dateFormate from '../../lib/dateFormat';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [Shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShow = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          ShowsDateTime: '2025-06-30T02:00:00.000Z',
          showPrice: 59,
          occupiedSeates: {
            A1: 'user_1',
            B1: 'user_2',
            C1: 'user_3',
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShow();
  }, []);

  return !loading ? (
    <>
      <Tittle text1="List" text2="Shows" />

      <div className="container mt-4 table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle text-white" style={{ backgroundColor: '#0d1b2a' }}>
          <thead className="table-dark">
            <tr>
              <th className="px-3">Movie Name</th>
              <th className="px-3">Show Time</th>
              <th className="px-3">Total Booking</th>
              <th className="px-3">Earning</th>
            </tr>
          </thead>
          <tbody>
            {Shows.map((show, index) => (
              <tr key={index}>
                <td className="px-3">{show.movie.title}</td>
                <td className="px-3">{dateFormate(show.ShowsDateTime)}</td>
                <td className="px-3">{Object.keys(show.occupiedSeates).length}</td>
                <td className="px-3">
                  {currency} {Object.keys(show.occupiedSeates).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
