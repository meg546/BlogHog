import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Post({ _id, author, time, title, reactions, comments = [] }) {
    const [likeCount, setLikeCount] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [username, setUsername] = useState('');


    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (_id && username) {
                try {
                    const response = await fetch(`http://localhost:5000/api/blogposts/${_id}?userId=${username}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserLiked(data.userLiked);
                    } else {
                        console.error('Error fetching like status');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchLikeStatus();
    }, [_id, username]);

    useEffect(() => {
        setLikeCount(reactions);
    }, [reactions]);

    const handleLike = async (e) => {
        e.stopPropagation();
        const url = `http://localhost:5000/api/blogposts/${_id}/like`;
        console.log('Toggling like for post at:', url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: username })
            });

            if (response.ok) {
                const data = await response.json();
                setLikeCount(data.likes || 0);
                setUserLiked(data.userLiked);
            } else {
                const error = await response.text();
                console.error('Error updating likes:', error);
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        const postUrl = `${window.location.origin}/posts/${_id}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            alert("Link copied to clipboard!");
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
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
                </div>
            </Link>
            <div className="post-footer">
                <Button className="reaction" onClick={handleLike}>
                    {userLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />} {likeCount}
                </Button>
                <Link to={`/posts/${_id}`} className="post-link">
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
