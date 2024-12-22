const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, commentPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Token authentication

// Routes
router.post('/', authMiddleware, createPost);           // Create a post
router.get('/', authMiddleware, getPosts);             // Get all posts
router.put('/:id/like', authMiddleware, likePost);     // Like a post
router.put('/:id/comment', authMiddleware, commentPost); // Add a comment

module.exports = router;
