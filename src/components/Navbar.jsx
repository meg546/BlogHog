import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import SavingsIcon from '@mui/icons-material/Savings';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment, useTheme } from '@mui/material';

function Navbar({setSearchTerms}) {
    const handleSearchChange = (e) => {
        setSearchTerms(e.target.value);
    };

    const theme = useTheme();
    const navigate = useNavigate();
    const isLoggedIn = () => localStorage.getItem('username') != null;

    const handleProfileClick = () => {
        if (isLoggedIn()) {
            console.log('hi1');
            navigate('/Profile');
        } else {
            console.log('hi2');
            navigate('/Login');
        }
    };


    return (
        <header className="nav-header">
            <div className="nav-container">
                <h1 className="brand">
                    <Link to="/" className="logo-link" style={{ color: theme.palette.primary.main }}>
                        <SavingsIcon color='primary' />
                        BlogHog
                    </Link>
                </h1>
                <Input
                    placeholder="Search here…"
                    onChange={handleSearchChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                <div className="button-container">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to="/CreatePost"
                        className="button">
                        Create
                    </Button>
                    <Button                    
                        variant="contained" 
                        color="primary" 
                        onClick={handleProfileClick}
                        className="button"
                    >
                        <AccountCircleIcon/>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
