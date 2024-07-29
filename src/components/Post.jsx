import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

function Post({ _id, author, time, title, reactions, comments }) {
    const [likeCount, setLikeCount] = useState(reactions);

    const handleLike = (e) => {
        e.stopPropagation(); // Prevent navigation on like button click
        setLikeCount(likeCount + 1);
        // Add further logic here (e.g., API call)
    };

    return (
        <div className="post">
            <Link to={`/posts/${_id}`} className="post-link">
                <div className="post-header">
                    <p className="author">{author}</p>
                    <div className="post-time-container">
                        <p className="post-time">{time}</p>
                        <MoreHorizIcon />
                    </div>
                </div>
                <div className="post-content">
                    <h2>{title}</h2>
                    {/* Additional content can be handled here */}
                </div>
            </Link>
            <div className="post-footer">
                <div className="reaction" onClick={handleLike}>
                    <ThumbUpOffAltIcon /> {likeCount}
                </div>
                <div className="reaction">
                    <ChatBubbleOutlineIcon /> {comments}
                </div>
                <div className="reaction">
                    <IosShareIcon /> Share
                </div>
            </div>
        </div>
    );
}

export default Post;
