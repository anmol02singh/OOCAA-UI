import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav>
        <button onClick={() => navigate(routes.home)}>Home</button>
        <button onClick={() => navigate(routes.about)}>About</button>
        <button onClick={() => navigate(routes.contact)}>Contact</button>
    </nav>
    );
}

export default Navbar;
