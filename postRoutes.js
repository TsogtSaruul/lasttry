const express = require("express");
const { getPosts, getPostsBySearch, getPost, createPost, commentPost, updatePost, likePost,  deletePost } = require("./postControllers.js");
const auth = require("./auth.js");

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.post('/:id/commentPost', commentPost);

router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);

router.delete('/:id', auth, deletePost);

export default router;