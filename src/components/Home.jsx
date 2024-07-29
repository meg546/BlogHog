import React from 'react';
import Post from './Post';

function Home({ posts }) {
    return (
        <div className="home">
            {posts.map(post => (
                <Post 
                    key={post._id}
                    _id={post._id}
                    author={post.author} 
                    time={post.time} 
                    title={post.title} 
                    reactions={post.reactions} 
                    comments={post.comments} 
                />
            ))}
        </div>
    );
}

export default Home;
