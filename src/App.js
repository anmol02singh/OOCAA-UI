import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/Navbar.tsx";
import routes from "./routes";
import UserLogin from "./pages/UserLogin.tsx";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
        </Routes>
        {/* <Navbar /> */}
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
