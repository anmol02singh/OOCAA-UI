<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//import "/Users/san/OOCAA-UI/src/styles/index.css";
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

function App() {
    const [theme, colorMode] = useMode();
    const [isNavbar, setIsNavbar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Navbar isNavbar = {isNavbar}/>   
                    <main className="content">
                        <Topbar setIsNavbar={setIsNavbar} />
                        
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/bar" element={<Bar />} />
                            <Route path="/pie" element={<Pie />} />
                            <Route path="/line" element={<Line />} />
                            <Route path="/geo" element={<Geo />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
>>>>>>> 0a08e504f8fa8e2f200f26dcca21c80746516105

export default App;