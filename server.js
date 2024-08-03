const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');    
const User = require('./user.js');
const Blogpost = require('./blogpost.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bloghogDB', {
        useNewUrlParser: true
});

// Function checks if username passed through Blogpost model exists in User model
const checkUserExists = async (username) => {
    const user = await User.findOne({username});
    if (user) {
        return true;
    } else {
        return false;
    }
};

// Function to log a user in
const loginUser = async (username, email, password) => {
    try {
        const user = await User.findOne({username, email, password});
        if (user){
            return user
        }
        return null;
    }
    catch (err) {
        console.error('Error logging in1', err)
    }
}

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
        const { username, password, confPassword, email } = req.body;
        const likes = [];
        const posts = [];

        if (!username || !password || !confPassword || !email) {
                return res.send('Please fill all fields.');
        }
        if (password !== confPassword) {
                return res.send('Passwords do not match.');
        }
        
        try {
            const newUser = new User({username, password, email, likes, posts});
            await newUser.save();
            res.send('User registered successfully!');
        } catch (error) {
            console.error('Error during user registration: ', error);
            res.send('Error registering user.');
        }
});

//Endpoint for finding blogposts
app.get('/api/blogposts', async (req, res) => {
    try {
        const posts = await Blogpost.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Endpoint for finding single blogpost by id
app.get('/api/blogposts/:id', async (req, res) => {
    try {
        const post = await Blogpost.findById(req.params.id);
        if (!post) {
            return res.send('Post not found');
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post: ', error);
        res.send('Internal Server Error');
    }
});

// Endpoint for creating blogposts
app.post('/api/blogposts', async (req, res) => {
    const {author, title, content, published } = req.body;

    console.log('Received data:', req.body);

    if (!author || !title || !content) {
        console.error('Validation error: Missing required fields');
        return res.send('Author, title, and content are required.');
    }

    
    let route = title.toLowerCase().split(' ').join('-'); 
    const time = new Date();

    let existingPost = await Blogpost.findOne({ route });
    if (existingPost) {
        route = `${route}-${Date.now()}`;
    }

    // Function for validating author
    const authorExists = await checkUserExists(author);
    if (!authorExists) {
        console.error('Author does not exist');
        return res.send(error);
    }

    try {
        const newBlogpost = new Blogpost({
            author,
            title,
            content,
            published: published === 'true',
            route,
            time,
            comments: [],
            likes: 0
        });
        await newBlogpost.save();
        console.log('Blogpost created:', newBlogpost);
        res.status(201).json(newBlogpost);
    } catch (error) {
        console.error('Error saving blog post:', error.message);
        res.send(error.message);
    }
});

//Endpoint for logging in to the website
app.post('/api/login', async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const user = await loginUser(username, email, password);
        if (user) {
            res.json({success: true, message: 'Login successful!' });
        }
        else{
            res.json({ success: false, message: 'Invalid username, email, or password.' });
        }
    }
    catch (err){
        console.error('Error logging in', err)
    }

});

//Endpoint for creating a post comment
app.post('/api/blogposts/:id/comments', async (req, res) => {
    const { id} = req.params;
    const {author, text } = req.body;

    if (!author || !text) {
        return res.status(400).send('Author and text content not found');
    }

    try {
        const post = await Blogpost.findById(id);
        if (!post) {
            return res.send('Post not found');
        }

        const newComment = {
            user: author,
            text: text,
            date: new Date(),
        };

        post.comments.push(newComment);
        await post.save();

        res.json(newComment);
    } catch (error) {
        console.error('Error adding comment: ', error);
        res.send('Internal Server Error');
    }
});

//Endpoint for adding a like to a post
app.post('/api/blogposts/:id/like', async (req, res) => {
    const {id } = req.params;

    try {
        const post = await Blogpost.findById(id);
        if (!post) {
            return res.send('Post not found');
        }

        post.likes += 1;
        await post.save();

        res.json({ likes: post.likes });
    } catch (error) {
        console.error('Error updating likes: ', error);
        res.send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});