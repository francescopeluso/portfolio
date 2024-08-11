import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import ReactGA from 'react-ga';

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import MobileRedirect from './MobileRedirect';

// Google Analytics
ReactGA.initialize('G-NK0F2022TD');

// PageTracker component to track page views
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};

const App = () => {

  // if you're visiting from mobile and not already on the mobile error page, redirect to error page
  if ((/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768) && !window.location.pathname.includes('/mobile')) {
    window.location.href = '/mobile';
  }

  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mobile" element={<MobileRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
