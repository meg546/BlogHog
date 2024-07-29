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

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    // Example posts data; in a real application, this would come from an API
    const posts = [
        {
            _id: 1,
            author: "Author 1",
            time: "1 hour ago",
            title: "Post 1",
            content: "Detailed content for post 1",
            reactions: 356,
            comments: [
                { author: "User1", time: "30 minutes ago", content: "Great post!" },
                { author: "User2", time: "25 minutes ago", content: "Thanks for sharing." },
                { author: "User2", time: "25 minutes ago", content: "Thanks for sharing." }
            ]
        },
        {
            _id: 2,
            author: "Rubickevich",
            time: "2 hours ago",
            title: "This horrendous abomination has absolutely carried me through MV, providing a virtually infinite amount of diesel, polyethylene, solar grade silicon and oxygen + hydrogen.",
            content: testImage,
            reactions: 200,
            comments: [
                { author: "User1", time: "30 minutes ago", content: "Great post!" },
                { author: "User2", time: "25 minutes ago", content: "Thanks for sharing." }
            ]
        },
        {
            _id: 3,
            author: "Mtoodles33",
            time: "8 hours ago",
            title: "I finally saw Tenet and genuinely thought it was horrific",
            content: "I have seen all of Christopher Nolan’s movies from the past 15 years or so. For the most part I’ve loved them. My expectations for Tenet were a bit tempered as I knew it wasn’t his most critically acclaimed release but I was still excited. Also, I’m not really a movie snob. I enjoy a huge variety of films and can appreciate most of them for what they are. Which is why I was actually shocked at how much I disliked this movie. I tried SO hard to get into the story but I just couldn’t. I don’t consider myself one to struggle with comprehension in movies, but for 95% of the movie I was just trying to figure out what just happened and why, only to see it move on to another mind twisting sequence that I only half understood (at best).",
            reactions: 200,
            comments: [
                { author: "User1", time: "30 minutes ago", content: "Great post!" },
                { author: "User2", time: "25 minutes ago", content: "Thanks for sharing." }
            ]
        },

    ];

    const isLoggedIn = () => {
        return localStorage.getItem('username') !== null;
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home posts={posts} />} /> {/* Home route displaying posts */}
                <Route path="/posts/:postId" element={<DetailedPost posts={posts} />} /> {/* Detailed post view */}
                <Route path="/CreatePost" element={<CreatePost />} /> {/* Route for CreatePost */}
                <Route path="/Register" element={<Register />}/>
                <Route path="/Login" element={<Login/>}/>
                <Route
                    path="/Profile"
                    element={<Profile posts={posts}/>}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
