import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import routes from './routes';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.about} element={<About />} />
                <Route path={routes.contact} element={<Contact />} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
