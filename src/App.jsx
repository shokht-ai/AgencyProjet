import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TourismLandingPage from './TourismLandingPage';
import PackageDetailPage from './PackageDetail';
import AuthPage from './Authorization';
import SearchFilterPage from './PackagSearchFiltering';
import CheckoutPage from './Checkout'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="/packages" element={<SearchFilterPage />}></Route>
          <Route path="/home" element={<TourismLandingPage />}></Route>
          <Route path="/package/:id" element={<PackageDetailPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
