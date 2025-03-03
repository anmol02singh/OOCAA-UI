import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./scenes/global/Navbar.tsx";
import { ColorModeContext, useMode } from "./theme.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar.tsx";
import Bar from "./scenes/Bar/index.tsx";
import Pie from "./scenes/Pie/index.tsx";
import Line from "./scenes/Line/index.tsx";
import Geo from "./scenes/Geo/index.tsx";
import Dashboard from "./scenes/dashboard/index.tsx";
import UserLogin from "./pages/UserLogin.tsx";
import { useLocation } from "react-router-dom";
import UserSignUp from "./pages/UserSignUp.tsx";
import AlertSystem from "./pages/AlertSystem.tsx";

function App() {
  const [theme, colorMode] = useMode();
  const [isNavbar, setIsNavbar] = useState(true);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!(isLoginPage || isSignupPage) && <Navbar isNavbar={isNavbar} />}
          <main className="content">
            {!(isLoginPage || isSignupPage) && (
              <Topbar setIsNavbar={setIsNavbar} />
            )}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geo" element={<Geo />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/alertsystem" element={<AlertSystem />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
