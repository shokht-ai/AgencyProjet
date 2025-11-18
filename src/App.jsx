import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TourismLandingPage from './TourismLandingPage';
import SearchFilterPage from './PackagesManagement'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<TourismLandingPage />}></Route>
          <Route path="/packages" element={<SearchFilterPage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
