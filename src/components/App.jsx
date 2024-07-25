import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CreatePost from './CreatePost';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Hello World!</h1>} /> {/* Home route */}
                <Route path="/CreatePost" element={<CreatePost />} /> {/* Route for CreatePost */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
