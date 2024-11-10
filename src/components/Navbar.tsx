import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" sx={{ backgroundColor: '#212b35', color: '#fff' }}  onClick={() => navigate(routes.home)}>
                    Home
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#212b35', color: '#fff' }} onClick={() => navigate(routes.about)}>
                    About
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#212b35', color: '#fff' }} onClick={() => navigate(routes.contact)}>
                    Contact
                </Button>
            </Stack>
        </nav>
    );
}

export default Navbar;
