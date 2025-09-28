


import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import SeatLayout from "./pages/SeatLayout";   // fixed capital S
import Layout from "./pages/admin/Layout";

import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import Dashboard from "./pages/admin/Dashbord"   // ✅ correct path



import { SignIn } from "@clerk/clerk-react";
import { useAppContext } from "./context/AppContext";
import Loading from "./components/Loding";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const { user } = useAppContext(); // ✅ correctly pulling from context

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
       <Route path="/my-bookings" element={<MyBookings/>} />
       <Route path="/loading/:nextUrl" element={<Loading/>}/>


        <Route path="/favorite" element={<Favorite />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            user ? (
              <Layout />
            ) : (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <SignIn fallbackRedirectUrl="/admin" /> 
              </div>
            )
          }
        >
          <Route index element={<Dashboard />} /> {/* default dashboard */}
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-booking" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;





