import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/Navbar.tsx";
import routes from './routes';
import { ColorModeContext, useMode } from "./theme.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar.tsx";


const App = () => {
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
};




function App(){
const [theme, colorMode] = useMode();

return(
    <ColorModeContext.Provider value = {colorMode}> 
        <ThemeProvider theme = {theme}> 
          <CssBaseline />
          <div className = "app">
             < main className="content">
              <Topbar />
             </main>
          </div>
        </ThemeProvider>
     </ColorModeContext.Provider>
  );
}

export default App;
