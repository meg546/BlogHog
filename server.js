const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  
const User = require('./user.js');

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/userdb', {
    useNewUrlParser: true
});

// Register user route
app.post('/api/register', async (req, res) => {
    const { username, password, confPassword, email } = req.body;

    console.log('Request body:', req.body);  // Log the incoming data

    // Simple validation
    if (!username || !password || !confPassword || !email) {
        return res.status(400).send('Please fill all fields.');
    }
    if (password !== confPassword) {
        return res.status(400).send('Passwords do not match.');
    }
  
    try {
      // Create a new user
      const newUser = new User({ username, password, email });
      await newUser.save();
      res.status(201).send('User registered successfully.');
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).send('Error registering user.');
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});