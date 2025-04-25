import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import ProfileEdit from "./pages/Profile/ProfileEdit.tsx";
import ProfileEditName from "./pages/Profile/ProfileEditName.tsx";
import ProfileEditEmail from "./pages/Profile/ProfileEditEmail.tsx";
import ProfileEditPhone from "./pages/Profile/ProfileEditPhone.tsx";
import AdminManageAccounts from "./pages/Admin/AdminManageAccounts.tsx";
import Navbar from "./scenes/global/Navbar.tsx";
import { ColorModeContext, useMode } from "./theme.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Topbar from "./scenes/global/Topbar.tsx";
import Bar from "./scenes/Bar/index.tsx";
import Pie from "./scenes/Pie/index.tsx";
import Line from "./scenes/Line/index.tsx";
import Geo from "./scenes/Geo/index.tsx";
import Dashboard from "./scenes/dashboard/index.tsx";
import UserLogin from "./pages/UserLogin.tsx";
import { useLocation } from "react-router-dom";
import UserSignUp from "./pages/UserSignUp.tsx";
import routes from "./routes.js";
import SettingsPopover from "./pages/SettingsPopover.tsx";
import Directory from "./pages/Directory.tsx";
import AlertSystem from "./pages/AlertSystem.tsx";
import Watchlist from "./pages/Watchlist.tsx";

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

        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {!(isLoginPage || isSignupPage) && (
            <div
              style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                overflowY: "hidden",
                overflowX: "hidden",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Navbar isNavbar={isNavbar} />
            </div>
          )}

          <main
            className="content"
            style={{
              marginLeft: !(isLoginPage || isSignupPage) ? "250px" : "0",
              flex: 1,
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                <Route path="/directory" element={<Directory />} />
                <Route path="/alertsystem" element={<AlertSystem />} />
                <Route path={routes.profile} element={<Profile />} />
                <Route path={routes.editProfile} element={<ProfileEdit />} />
                <Route
                  path={routes.editProfileName}
                  element={<ProfileEditName />}
                />
                <Route
                  path={routes.editProfileEmail}
                  element={<ProfileEditEmail />}
                />
                <Route
                  path={routes.editProfilePhone}
                  element={<ProfileEditPhone />}
                />
                <Route path="/settings" element={<SettingsPopover />} />
                <Route
                  path={routes.manageAccounts}
                  element={<AdminManageAccounts />}
                />
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
