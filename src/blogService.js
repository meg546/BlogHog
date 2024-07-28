// src/blogService.js
const API_URL = 'http://localhost:5000/api/blogposts';

export const createBlogPost = async (post) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if (!response.ok) {
            throw new Error('Failed to create blog post');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
