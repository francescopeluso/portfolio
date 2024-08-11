import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import MobileRedirect from './MobileRedirect';


const App = () => {

  // if you're visiting from mobile and not already on the mobile error page, redirect to error page
  if ((/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768) && !window.location.pathname.includes('/mobile')) {
    window.location.href = '/mobile';
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mobile" element={<MobileRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
