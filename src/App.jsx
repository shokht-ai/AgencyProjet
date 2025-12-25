import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import TourismLandingPage from "./TourismLandingPage";
import PackageDetailPage from "./PackageDetail";
import AuthPage from "./Authorization";
import SearchFilterPage from "./PackagSearchFiltering";
import CheckoutPage from "./Checkout";
import UserProfilePage from './UserProfile';
// import Navbar from "./Navbar";

export function HistoryTracker() {
  const location = useLocation();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    // Takrorlanmasligi uchun
    if (history[history.length - 1] !== location.pathname) {
      history.push(location.pathname);
    }

    localStorage.setItem("history", JSON.stringify(history));
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <HistoryTracker />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/" element={<AuthPage />} />
          <Route path="/packages" element={<SearchFilterPage />}></Route>
          <Route path="/home" element={<TourismLandingPage />}></Route>
          <Route path="/package/:id" element={<PackageDetailPage />}></Route>
          <Route path="/checkout/:id" element={<CheckoutPage />}></Route>
          <Route path="/profile" element={<UserProfilePage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
