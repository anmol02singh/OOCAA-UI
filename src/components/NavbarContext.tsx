/*This is for maintaining the navbar state across pages*/

import React, { createContext, useContext, useState} from 'react';

const defaultContextValue = {
    isNavbarOpen: false,
    toggleNavbar: () => {},
};

const NavbarContext = createContext(defaultContextValue);

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const storedState = localStorage.getItem('navbarOpen') === 'true'; 
  const [isNavbarOpen, setIsOpen] = useState(storedState);

  const toggleNavbar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('navbarOpen', String(newState));
      return newState;
    });
  };

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};