import React, { useState } from 'react';
import { TextField, Button, Container, Box, Grid, Avatar } from '@mui/material';
import Post from './Post';
import { Link } from "react-router-dom";

function Profile({ posts }) {

    return (
        <Container>
            <Grid container columns={16} p={2} rowGap={4}
            sx={{
                border: '1px solid',
                borderRadius: '14px',
                borderColor: 'grey.300',
                marginTop: '10vh'
            }}>
                <Grid sm={2} display="flex" justifyContent="center" alignItems="center">
                <Avatar src="/broken-image.jpg"
                sx={{ width: 56, height: 56 }}/>
                </Grid>
                <Grid sm={14} alignSelf={'center'}>
                <h1>@username</h1>
                </Grid>
                <Grid sm={2}>
                </Grid>
                <Grid sm={4}>
                <h2>Email</h2>
                </Grid>
                <Grid sm={2}>
                <Button variant="outlined" display="flex" justifyContent="center" alignItems="center">Reveal</Button>
                </Grid>
                <Grid sm={8}>
                <h2>e****@gmail.com</h2>
                </Grid>
                <Grid sm={2}>
                </Grid>
                <Grid sm={4}>
                <h2>Password</h2>
                </Grid>
                <Grid sm={2}>
                <Button variant="outlined" display="flex" justifyContent="center" alignItems="center">Reveal</Button>
                </Grid>
                <Grid sm={8}>
                <h2>p******d</h2>
                </Grid>
                <Grid sm={2}>
                </Grid>
                <Grid sm={12}>
                <Button variant="contained">View Blog Posts</Button>
                </Grid>
                <Grid sm={2}>
                </Grid>
                <Grid sm={2}>
                </Grid>
                <Grid sm={12} >
                <Button variant="contained">Change Icon</Button>
                </Grid>
                <Grid sm={2}>
                </Grid>
            </Grid>
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
        </Container>
    )
};

export default Profile;
