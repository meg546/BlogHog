import React from "react";
import { Link } from "react-router-dom";
import SavingsIcon from '@mui/icons-material/Savings';
import Button from '@mui/material/Button';

function Navbar() {
    return (
        <header>
            <h1>
                <SavingsIcon />
                BlogHog
            </h1>
            <Button variant="contained" color="primary" component={Link} to="/CreatePost">
                Create
            </Button>
        </header>
    );
}

export default Navbar;
