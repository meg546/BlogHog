import * as React from 'react';
import { Link } from "react-router-dom";
import SavingsIcon from '@mui/icons-material/Savings';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment, useTheme } from '@mui/material';

function Navbar() {
    const theme = useTheme();

    return (
        <header style={headerStyle}>
            <div style={navContainerStyle}>
                <h1 style={brandStyle}>
                    <Link to="/" style={{ ...logoLinkStyle, color: theme.palette.primary.main }}>
                        <SavingsIcon color='primary' />
                        BlogHog
                    </Link>
                </h1>
                <Input
                    placeholder="Search here…"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                <div style={buttonContainerStyle}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to="/CreatePost"
                        style={buttonStyle}
                    >
                        Create
                    </Button>
                    <Button                    
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to="/Profile"
                        style={buttonStyle}
                    >
                        <AccountCircleIcon/>
                    </Button>
                    
                </div>
            </div>
        </header>
    );
}

const headerStyle = {
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    width: '99%',
    margin: '0 auto',
};

const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const brandStyle = {
    display: 'flex',
    alignItems: 'center',
};

const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const buttonStyle = {
    width: 'auto'
};

const logoLinkStyle = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
};

export default Navbar;
