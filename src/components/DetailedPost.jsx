import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

function DetailedPost({ posts }) {
    const { postId } = useParams();
    const post = posts.find(p => p._id === parseInt(postId, 10));

    if (!post) {
        return <div>Post not found</div>;
    }

    const isImageUrl = (url) => {
        return /\.(jpeg|jpg|gif|png|webp)$/.test(url);
    };

    return (
        <div className="post">
            <div className="post-header">
                <p className="author">{post.author}</p>
                <div className="post-time-container">
                    <p className="post-time">{post.time}</p>
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                {isImageUrl(post.content) ? (
                    <img src={post.content} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />
                ) : (
                    <p>{post.content}</p>
                )}
            </div>
            <div className="post-footer">
                <Button className="reaction"> <ThumbUpOffAltIcon /> {post.reactions}</Button>
                <Button className="reaction"> <ChatBubbleOutlineIcon /> {post.comments}</Button>
                <Button className="reaction"> <IosShareIcon /> Share</Button>
            </div>
        </div>
    );
}

export default DetailedPost;
