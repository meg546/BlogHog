import React, { useEffect, useState } from 'react';
import Post from './Post';
import timeAgo from './utlities'

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch posts from the API
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogposts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error('Failed to fetch posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div className="home">
            {posts.map(post => (
                <Post 
                    key={post._id}
                    _id={post._id}
                    author={post.author} 
                    time={timeAgo(post.time)}
                    title={post.title} 
                    reactions={post.reactions} 
                    comments={post.comments} 
                />
            ))}
        </div>
    );
}

export default Home;
