import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CreatePost from './CreatePost';
import Register from './Register';
import Home from './Home'; // Import the Home component

function App() {
    function routeProfile(){
        return("/Register");
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home route displaying posts */}
                <Route path="/CreatePost" element={<CreatePost />} /> {/* Route for CreatePost */}
                <Route path={routeProfile()} element={<Register />} /> {/* Route for Register */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
