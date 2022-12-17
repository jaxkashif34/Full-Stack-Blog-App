import express from 'express';
import { createPost } from '../../controller/posts/createPost';
import { deletePost } from '../../controller/posts/deletePost';
import { editPost } from '../../controller/posts/Edit';
const router = express.Router();

import { getAllPosts } from '../../controller/posts/getAllPosts'; 

router.get('/all-posts', getAllPosts);

router.post('/create-post', createPost);

// Delete post
router.delete('/delete-post/:id', deletePost);

// Edit post
router.put('/edit-post/:id', editPost);

export default router;
