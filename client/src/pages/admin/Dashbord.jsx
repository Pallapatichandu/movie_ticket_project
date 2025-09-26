// import { ChartLineIcon, CircleDollarSignIcon, Icon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { dummyDashboardData } from '../../assets/assets'
// import Loading from '../../components/Loding'
// import Tittle from './Tittle'
// import BlueCircle from '../../components/BlueCircle'
// import dateFormate from '../../lib/dateFormat'

// const Dashbord = () => {
//     const currency=import.meta.evn.VITE_CURRENCY
//     const [dashboardData,SetdashboardData]=useState({
//       totalBookings:0,
//       totalRevenue:0,
//       activeShows:[],
//       totalUser:0
//     })
//     const[loading,SetLoading]=useState(true)
//     const daashboardCard=[
//       {
//         title:"Total Bookings",value:dashboardData.totalBookings || "0",Icon:ChartLineIcon
//       },
//       {
//         title:"Total Revenue",value:currency+dashboardData.totalRevenue || "0",Icon:CircleDollarSignIcon
//       },
//       {
//         title:"Active Shows ",value:dashboardData.activeShows.length || "0",Icon:PlayCircleIcon
//       },
//       {
//         title:"Total Users",value:dashboardData.totalUser || "0",Icon:UserIcon
//       }
//     ]
//     const fetchDashbordData=async()=>{
//       SetdashboardData(dummyDashboardData)
//       SetLoading(false)
//     }
//     useEffect(()=>{
//       fetchDashbordData()
//     },[])
//   return !loading ? (
//     <>
//    <Tittle text1="Admin" text2="Dashbord"/>
//    <div className='relative flex flex-wrap gap-4 mt-6'>
//     <BlueCircle top="100" left='0'/>
//     <div className='flex flex-wrap gap-4 w-full'>
//       {daashboardCard.map((card,index)=>(
//         <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
//           <div>
//             <h1 className='text-sm'>{card.title}</h1>
//             <p className='text-xl font-medium mt-1'>{card.value}</p>
//           </div>
//           <card.Icon className='w-6 h-6'/>

//         </div>
//       ))}

//     </div>

//    </div>
//    <p className='mt-10 text-lg font-medium'>Active Shows</p>
//    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
//     <BlueCircle top="100px" let="-10%"/>
//     {dashboardData.activeShows.map((show)=>(
//       <div key={show._id} className='w-5 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'>
//         <img src={show.movie.poster_path} alt="" className='h-60 w-full object-fit-cover' />
//         <p className='font-medium p-2 truncate'>{show.movie.title}</p>
//         <div className='flex items-center justify-between px-2'>
//           <p className='text-lg font-medium'>{currency}{show.showPrice}</p>
//           <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1 '>
//             <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//             {show.movie.vote_average.toFixed(1)}
//           </p>

//         </div>
//         <p className='px-2 pt-2 text-sm text-sm text-gray-500'>{dateFormate(show.showDateTime)}</p>

//       </div>
//     ))}

//    </div>
//     </>
//   ):<Loading/>
// }

// export default Dashbord

import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/Loding'
import Tittle from './Tittle'
import dateFormate from '../../lib/dateFormat'

const Dashbord = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  })
  const [loading, setLoading] = useState(true)

  const dashboardCard = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", Icon: ChartLineIcon },
    { title: "Total Revenue", value: currency + (dashboardData.totalRevenue || "0"), Icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows.length || "0", Icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", Icon: UserIcon }
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return !loading ? (
    <div className="container py-4" style={{ color: "#ffffff" }}>
      {/* Title */}
      <Tittle text1="Admin" text2="Dashboard" />

      {/* Stat Cards */}
      <div className="row mt-4">
        {dashboardCard.map((card, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="custom-card h-100 shadow-sm px-3 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{card.title}</h6>
                  <h4 className="fw-semibold">{card.value}</h4>
                </div>
                <card.Icon size={28} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      <p className="mt-5 fs-5 fw-semibold">Active Shows</p>
      <div className="row mt-3">
        {dashboardData.activeShows.map((show) => (
          <div key={show._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="custom-card h-100 shadow-sm">
              <img
                src={show.movie.poster_path}
                alt={show.movie.title}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title">{show.movie.title}</h6>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0 fw-semibold">{currency}{show.showPrice}</p>
                  <p className="mb-0 d-flex align-items-center small text-light">
                    <StarIcon size={16} className="text-warning me-1" />
                    {show.movie.vote_average.toFixed(1)}
                  </p>
                </div>

                <p className="small text-light">{dateFormate(show.showDateTime)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for blur + hover */}
      <style>{`
        .custom-card {
          background: rgba(13, 27, 42, 0.7); /* transparent background */
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          backdrop-filter: blur(12px); /* blur effect */
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  )
}

export default Dashbord


