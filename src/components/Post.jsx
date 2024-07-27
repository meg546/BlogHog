import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';

function Post({ author, time, title, reactions, comments }) {
    return (
        <div className="post">
            <div className="post-header">
                <p className="author">{author}</p>
                <div className="post-time-container">
                    <p className="post-time">{time}</p>
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="post-content">
                <h2>{title}</h2>
                {/* Add image or additional content here if available */}
            </div>
            <div className="post-footer">
                <Button className="reaction"> <ThumbUpOffAltIcon /> {reactions}</Button>
                <Button className="reaction"> <ChatBubbleOutlineIcon /> {comments}</Button>
                <Button className="reaction"> <IosShareIcon /> Share</Button>
            </div>
        </div>
    );
}

export default Post;
