import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile.tsx";
import ProfileEdit from "./pages/Profile/ProfileEdit.tsx"
import ProfileEditName from "./pages/Profile/ProfileEditName.tsx"
import ProfileEditEmail from "./pages/Profile/ProfileEditEmail.tsx"
import ProfileEditPhone from "./pages/Profile/ProfileEditPhone.tsx"
import AdminManageAccounts from "./pages/Admin/AdminManageAccounts.tsx"
import AdminRoleChangeRequests from "./pages/Admin/AdminRoleChangeRequests.tsx"
import Navbar from "./scenes/global/Navbar.tsx";
import { ColorModeContext, useMode } from "./theme.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Topbar from "./scenes/global/Topbar.tsx";
import Bar from "./scenes/Bar/index.tsx";
import Pie from "./scenes/Pie/index.tsx";
import Line from "./scenes/Line/index.tsx";
import Geo from "./scenes/Geo/index.tsx";
import UserLogin from "./pages/UserLogin.tsx";
import { useLocation } from "react-router-dom";
import UserSignUp from "./pages/UserSignUp.tsx";
import routes from "./routes.js";
import SettingsPopover from "./pages/SettingsPopover.tsx";
import Directory from "./pages/Directory.tsx";
import Watchlist from "./pages/Watchlist.tsx";
import About from "./pages/About.tsx";
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
              <div className="app" style={{
                width: '100vw',
                height: '100vh',
                "overflow-x": "hidden",
              }}>
                  {!(isLoginPage || isSignupPage) && <Navbar isNavbar={isNavbar} />}
                  <main className="content">
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      {!(isLoginPage || isSignupPage) && <Topbar setIsNavbar={setIsNavbar} />}
                        <Routes>
                          <Route path="/" element={<Directory />} />
                          <Route path="/bar" element={<Bar />} />
                          <Route path="/pie" element={<Pie />} />
                          <Route path="/line" element={<Line />} />
                          <Route path="/geo" element={<Geo />} />
                          <Route path="/login" element={<UserLogin />} />
                          <Route path="/signup" element={<UserSignUp />} />
                          <Route path="/watchlist" element={<Watchlist />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/alerts" element={<AlertSystem />} />
                          <Route path={routes.profile} element={<Profile />} />
                          <Route path={routes.editProfile} element={<ProfileEdit />} />
                          <Route path={routes.editProfileName} element={<ProfileEditName />} />
                          <Route path={routes.editProfileEmail} element={<ProfileEditEmail />} />
                          <Route path={routes.editProfilePhone} element={<ProfileEditPhone />} />
                          <Route path="/settings" element={<SettingsPopover/>} />
                          <Route path={routes.manageAccounts} element={<AdminManageAccounts />} />
                          <Route path={routes.manageRequests} element={<AdminRoleChangeRequests />} />
                        </Routes>
                    </Box>
                  </main>
              </div>
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;