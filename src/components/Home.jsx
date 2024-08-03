import React, { useEffect, useState } from 'react';
import Post from './Post';
import {timeAgo} from './utilities';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogposts');
                if (response.ok) {
                    const data = await response.json();

                    const sortedPosts = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                    setPosts(sortedPosts);
                } else {
                    console.error('Failed to fetch posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="home">
            {posts.map(post => (
                <Post 
                    key={post._id}
                    _id={post._id}
                    author={post.author} 
                    time={timeAgo(post.time)}
                    title={post.title} 
                    reactions={post.likes} 
                    comments={post.comments} 
                />
            ))}
        </div>
    );
}

export default Home;
