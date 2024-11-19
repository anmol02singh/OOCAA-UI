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
import Bar from "./scenes/Bar/index.tsx";
import Pie from "./scenes/Pie/index.tsx";
import Line from "./scenes/Line/index.tsx";
import Geo from "./scenes/Geo/index.tsx";
import Dashboard from "./scenes/dashboard/index.tsx";
//import { Dashboard } from "@mui/icons-material";





function App(){
const [theme, colorMode] = useMode();

return(
    <ColorModeContext.Provider value = {colorMode}> 
        <ThemeProvider theme = {theme}> 
          <CssBaseline />
          <div className = "app">
             < main className="content">
              <Topbar />
              <Routes> 
               <Route path = "/" element = {<Dashboard/>}/>
               <Route path = "/bar" element = {<Bar/>}/>
               <Route path = "/pie" element = {<Pie/>}/>
               <Route path = "/line" element = {<Line/>}/>
               <Route path = "/geo" element = {<Geo/>}/>
              </Routes>
             </main>
          </div>
        </ThemeProvider>
     </ColorModeContext.Provider>
  );
}

export default App;
