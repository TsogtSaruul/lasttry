const mongoose = require("mongoose");
const PostMessage = require("./postMessage.js");


export const getPosts = async (req, res) => {

    try {
        const posts = await PostMessage.find().sort({ _id: -1 });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getPostsBySearch = async (req, res) => {

    const { searchQuery } = req.query;

    try {
        const drink = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ drink });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getPost = async (req, res) => { 

    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {

    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {

    const post = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id!');

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, dateModified: new Date().toISOString() }, { new: true });

        res.status(202).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    };    
};


export const likePost = async (req, res) => {

    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(likedPost);
}


export const commentPost = async (req, res) => {

    const { id } = req.params;
    const { value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

