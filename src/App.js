import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import UserSignUp from "./pages/UserSignUp.tsx";
import routes from "./routes";
import UserLogin from "./pages/UserLogin.tsx";
import NavbarLayout from "./components/NavbarLayout.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
      </Routes>
      <Routes>
        <Route
          path={routes.home}
          element={
            <NavbarLayout>
              <Home />
            </NavbarLayout>
          }
        />
        <Route
          path={routes.about}
          element={
            <NavbarLayout>
              <About />
            </NavbarLayout>
          }
        />
        <Route
          path={routes.contact}
          element={
            <NavbarLayout>
              <Contact />
            </NavbarLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
