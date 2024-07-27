import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

function Post() {
    return (
        <div className="post">
            <div className="post-header">
                <p className="author">AUTHORR</p>
                <div className="post-time-container">
                    <p className="post-time">POST TIME?!?!?!?</p>
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="post-content">
                <h2>POST TITLE GOES HERE</h2>
                {/* Add image here if the post has an image */}
            </div>
            <div className="post-footer">
                <div className="reaction"> <ThumbUpOffAltIcon/> 356</div>
                <div className="reaction"> <ChatBubbleOutlineIcon/> 132</div>
                <div className="reaction"> <IosShareIcon/> Share</div>
            </div>
        </div>
    );
}

export default Post;
