import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/Navbar.tsx";
import routes from "./routes";
import UserLogin from "./pages/UserLogin.tsx";import { NavbarProvider } from "./components/NavbarContext.tsx";

const PageContainer = {
  padding: '1em',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  maxWidth: '100%',
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
        </Routes>
        <Navbar />
        <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.about} element={<About />} />
                <Route path={routes.contact} element={<Contact />} />
            </Routes>
      </div>
    </Router>
  );
};

export default App;
