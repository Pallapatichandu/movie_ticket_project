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

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCard = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      Icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + (dashboardData.totalRevenue || "0"),
      Icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      Icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      Icon: UserIcon,
    },
  ];

  // ✅ Fetch Dashboard Data
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

  if (loading) return <Loading />;

  return (
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
        {dashboardData.activeShows.length > 0 ? (
          dashboardData.activeShows
            .filter((show) => show?.movie && show.movie?.title)
            .map((show) => {
              const movie = show.movie;
              const poster = movie.poster_path
                ? image_base_url + movie.poster_path
                : "/placeholder.jpg";

              return (
                <div
                  key={show._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="custom-card h-100 shadow-sm">
                    <img
                      src={poster}
                      alt={movie.title || "Untitled Movie"}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        {movie.title || "Unknown Movie"}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="mb-0 fw-semibold">
                          {currency}
                          {show.showPrice ?? "0"}
                        </p>
                        <p className="mb-0 d-flex align-items-center small text-light">
                          <StarIcon size={16} className="text-warning me-1" />
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </p>
                      </div>
                      <p className="small text-light">
                        {show.showDateTime
                          ? dateFormate(show.showDateTime)
                          : "No Date"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-secondary">No active shows available.</p>
        )}
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
  );
};

export default Dashboard;
