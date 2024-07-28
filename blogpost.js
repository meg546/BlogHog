const mongoose = require('mongoose');

const blogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
    },

    // This will be used to handle the routing for the URL
    route: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },

    // Used for blogposts that users are still working on but saved in DB
    published: {
        type: Boolean,
        default: false
    },

    // Filepath will be stored in type
    images: {
        type: [String],
        default: [],
        trim: true
    },
    comments: [{
        user: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date
        }
    }],
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

module.exports = Blogpost;