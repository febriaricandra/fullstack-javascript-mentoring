import * as PostController from '../controllers/post.controller.js';
import express from 'express';

const router = express.Router();

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts', PostController.createPost);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

router.get('/posts/:id/comments', PostController.getCommentPosts);

export default router;