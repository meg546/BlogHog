import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CreatePost from './CreatePost';

function App() {
<<<<<<< HEAD
    return(
        <div>
        <Navbar />
            <h1>
                Hello World! 1
            </h1>
        </div>
    )
=======
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
>>>>>>> 0165e053cc0b3457ce8b61aeae8bf398b794779d
}

export default App;
