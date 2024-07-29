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
    const user = await User.findOne({ username });
    if (user) {
        return true;
    } else {
        return false;
    }
};

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


app.post('/api/register', async (req, res) => {
        const { username, password, confPassword, email } = req.body;
        const likes = [];
        const posts = [];

        if (!username || !password || !confPassword || !email) {
                return res.status(400).send('Please fill all fields.');
        }
        if (password !== confPassword) {
                return res.status(400).send('Passwords do not match.');
        }
        
        try {
            const newUser = new User({ username, password, email, likes, posts });
            await newUser.save();
            res.status(201).send('User registered successfully.');
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).send('Error registering user.');
        }
});

// Creating blogposts
app.post('/api/blogposts', async (req, res) => {
    const { author, title, text, tags, published, images } = req.body;
    var route = '';
    var time = '';
    const comments = [];
    const likes = 0;

    // Validate the author
    const authorExists = await checkUserExists(author);
    if (!authorExists) {
        return res.status(400).send('Author does not exist.');
    }

    try {
        const newBlogpost = new Blogpost({ author, title, time, route, text, tags, published, images, comments, likes});
        await newBlogpost.save();
        res.status(201).json(newBlogpost);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/api/login', async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const user = await loginUser(username, email, password);
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        }
        else{
            res.status(401).json({ success: false, message: 'Invalid username, email, or password' });
        }
    }
    catch (err){
        console.error('Error logging in', err)
    }

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});