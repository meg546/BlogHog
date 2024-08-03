import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CreatePost from './CreatePost';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import DetailedPost from './DetailedPost';
import testImage from './this-horrendous-abomination-has-absolutely-carried-me-v0-m1xnw838tted1.webp';

function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [searchTerms, setSearchTerms] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <Router>
            <Navbar setSearchTerms={setSearchTerms} />
            <Routes>
                <Route path="/" element={<Home searchTerms={searchTerms} />} />
                <Route path="/posts/:_id" element={<DetailedPost/>} />
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/Register" element={<Register />}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Profile" element={<Profile/>}/>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
