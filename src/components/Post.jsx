import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';

function Post({ id, author, time, title, reactions, comments }) {
    const [likeCount, setLikeCount] = useState(reactions);

    const handleLike = (e) => {
        e.stopPropagation();
        setLikeCount(likeCount + 1);
        // Add further logic here (e.g., API call)
    };

    const handleShare = (e) => {
        e.stopPropagation();
        const postUrl = `${window.location.origin}/posts/${id}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            alert("Link copied to clipboard!");
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="post">
            <Link to={`/posts/${id}`} className="post-link">
                <div className="post-header">
                    <p className="author">{author}</p>
                    <div className="post-time-container">
                        <p className="post-time">{time}</p>
                        <MoreHorizIcon />
                    </div>
                </div>
                <div className="post-content">
                    <h2>{title}</h2>
                </div>
            </Link>
            <div className="post-footer">
                <Button className="reaction" onClick={handleLike} startIcon={<ThumbUpOffAltIcon />}>
                    {likeCount}
                </Button>
                <Link to={`/posts/${id}`} className="post-link">
                    <Button className="reaction" startIcon={<ChatBubbleOutlineIcon />}>
                        {comments.length}
                    </Button>
                </Link>
                <Button className="reaction" onClick={handleShare} startIcon={<IosShareIcon />}>
                    Share
                </Button>
            </div>
        </div>
    );
}

export default Post;
