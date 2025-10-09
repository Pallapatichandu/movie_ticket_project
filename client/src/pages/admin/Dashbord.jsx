import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Tittle from "./Tittle";
import Loading from "../../components/Loding";
import dateFormate from "../../lib/dateFormat";

const Dashbord = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCard = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", Icon: ChartLineIcon },
    { title: "Total Revenue", value: currency + (dashboardData.totalRevenue || "0"), Icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows.length || "0", Icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", Icon: UserIcon }, // ✅ matched key
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

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
                src={image_base_url + show.movie.poster_path}
                alt={show.movie.title}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title">{show.movie.title}</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0 fw-semibold">
                    {currency}
                    {show.showPrice}
                  </p>
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

      {/* Custom CSS */}
      <style>{`
        .custom-card {
          background: rgba(13, 27, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          backdrop-filter: blur(12px);
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
  );
};

export default Dashbord;
