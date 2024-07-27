import React from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

function Home({ posts }) {
    return (
        <div className="home">
            {posts.map(post => (
                <Link to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Post 
                        author={post.author} 
                        time={post.time} 
                        title={post.title} 
                        reactions={post.reactions} 
                        comments={post.comments} 
                    />
                </Link>
            ))}
        </div>
    );
}

export default Home;
