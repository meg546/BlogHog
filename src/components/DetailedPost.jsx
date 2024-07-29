import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '@mui/material/Button';
import CommentComponent from './CommentComponent';
import TextField from '@mui/material/TextField';
import { timeAgo } from './utlities';



function DetailedPost({ posts }) {
    const { postId } = useParams();
    const post = posts.find(p => p._id === parseInt(postId, 10));
    const [likeCount, setLikeCount] = useState(post.reactions);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState("");
    const [commentsCount, setCommentsCount] = useState(comments.length);

    if (!post) {
        return <div>Post not found</div>;
    }

    const isImageUrl = (url) => /\.(jpeg|jpg|gif|png|webp)$/.test(url);

    const handleLike = (e) => {
        e.stopPropagation();
        setLikeCount(likeCount + 1);
    };

    const handleShare = (e) => {
        e.stopPropagation();
        const postUrl = `${window.location.origin}/posts/${post._id}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            alert("Link copied to clipboard!");
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== "") {
            try {
                const response = await fetch(`http://localhost:5000/api/blogposts/${(postId)}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        author: "defaultUser",  // default author for now
                        text: newComment,
                    }),
                });
    
                if (response.ok) {
                    const newCommentObject = await response.json();
                    setComments([...comments, newCommentObject]);
                    setNewComment("");
                } else {
                    const errorText = await response.text(); // Read the response body
                    console.error('Error adding comment', errorText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.warn('Cannot submit an empty comment.');
        }
    };

    return (
        <div className="detailed-post">
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
                    <Button className="reaction" onClick={handleLike}>
                        <ThumbUpOffAltIcon /> {likeCount}
                    </Button>
                    <Button className="reaction">
                        <ChatBubbleOutlineIcon /> {post.comments.length}
                    </Button>
                    <Button className="reaction" onClick={handleShare}>
                        <IosShareIcon /> Share
                    </Button>
                </div>
            </div>
            <div className="comments-section">
                <div className="text-field-container">
                    <TextField
                        id="fullWidth"
                        label="Add a comment"
                        variant="standard"
                        fullWidth
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <Button onClick={handleCommentSubmit} variant="text" color="primary" className="submit-button">
                        Submit
                    </Button>
                </div>
                {comments.map((comment, index) => (
                    <CommentComponent key={index} {...comment} time={timeAgo(comment.time)} />
                ))}
            </div>
        </div>
    );
}

export default DetailedPost;
