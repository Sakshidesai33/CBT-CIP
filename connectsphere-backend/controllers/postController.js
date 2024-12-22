const Post = require('../models/Post'); // Import Post model

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const newPost = new Post({
            user: req.user.id, // Get user ID from token
            content,
        });

        const post = await newPost.save(); // Save post in DB
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username'); // Populate user details
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
            await post.save();
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a comment
exports.commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        const comment = {
            user: req.user.id,
            text,
        };

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
