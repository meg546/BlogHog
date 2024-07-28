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


app.post('/api/register', async (req, res) => {
        const { username, password, confPassword, email } = req.body;

        if (!username || !password || !confPassword || !email) {
                return res.status(400).send('Please fill all fields.');
        }
        if (password !== confPassword) {
                return res.status(400).send('Passwords do not match.');
        }
    
        try {
            const newUser = new User({ username, password, email });
            await newUser.save();
            res.status(201).send('User registered successfully.');
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).send('Error registering user.');
        }
});

// Function checks if username passed through Blogpost model exists in User model
const validateUsernamesExistence = async (usernames) => {
    const users = await User.find({username: {$in: usernames}});
    const existingUsernames = new Set(users.map(user => user.username));

    return usernames.every(username => existingUsernames.has(username));
};

// Creating blogposts
app.post('/api/blogpost', async (req, res) => {
    const { author, comments } = req.body;

    // Validate the author
    const authorExists = await validateUsernamesExistence([author]);
    if (!authorExists) {
        return res.status(400).send('Author does not exist.');
    }

    // Validate the users in comments
    const commentUsernames = comments.map(comment => comment.user);
    const allCommentUsersExist = await validateUsernamesExistence(commentUsernames);
    if (!allCommentUsersExist) {
        return res.status(400).send('One or more comment users do not exist.');
    }

    try {
        const newBlogpost = new Blogpost(req.body);
        await newBlogpost.save();
        res.status(201).json(newBlogpost);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});