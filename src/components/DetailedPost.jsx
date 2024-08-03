import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import CommentComponent from './CommentComponent';
import TextField from '@mui/material/TextField';
import { timeAgo } from './utilities';

function DetailedPost() {
    const { _id } = useParams();
    const [post, setPost] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')

    // Fetch the username from localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Fetch post data from the API, including comments
    useEffect(() => {
        if (_id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/blogposts/${_id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPost(data);
                        setLikeCount(data.likes || 0);
                        setComments(data.comments || []);
                    } else {
                        setError('Post not found');
                    }
                } catch (error) {
                    setError('Error fetching post');
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        } else {
            setError('Invalid post ID');
            setLoading(false);
        }
    }, [_id]);
    
    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:5000/api/blogposts/${_id}/like`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                setLikeCount(data.likes);
            } else {
                console.error('Error updating likes');
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

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== "" && username.trim() !== "") {
            try {
                const response = await fetch(`http://localhost:5000/api/blogposts/${_id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        author: username, 
                        text: newComment,
                    }),
                });

                if (response.ok) {
                    const newCommentObject = await response.json();
                    setComments([...comments, newCommentObject]);
                    setNewComment("");
                } else {
                    const errorText = await response.text();
                    console.error('Error adding comment:', errorText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.warn('Username and comment text are required.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const isImageUrl = (url) => /\.(jpeg|jpg|gif|png|webp)$/.test(url);

    return (
        <div className="detailed-post">
            <div className="post">
                <div className="post-header">
                    <p className="author">{post.author}</p>
                    <div className="post-time-container">
                        <p className="post-time">{timeAgo(post.time)}</p>
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
                    <Button className="reaction" onClick={handleLike}>
                        <ThumbUpOffAltIcon /> {likeCount}
                    </Button>
                    <Button className="reaction">
                        <ChatBubbleOutlineIcon /> {comments.length}
                    </Button>
                    <Button className="reaction" onClick={handleShare}>
                        <IosShareIcon /> Share
                    </Button>
                </div>
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                <div className="text-field-container">
                    <TextField
                        id="fullWidth"
                        label="Add a comment"
                        variant="standard"
                        fullWidth
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleCommentSubmit} variant="text" color="primary" className="submit-button">
                        Submit
                    </Button>
                </div>
                {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <strong>{comment.user}</strong>
                                <span className="comment-time">{timeAgo(comment.date)}</span>
                            </div>
                            <div className="comment-content">
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


export default DetailedPost;
