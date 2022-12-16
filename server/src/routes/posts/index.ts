import express from 'express';
import { createPost } from '../../controller/posts/createPost';
const router = express.Router();

import { getAllPosts } from '../../controller/posts/getAllPosts'; 
// import { } from '../post';

router.get('/all-posts', getAllPosts);

router.post('/create-post', createPost);

// // Delete post
// router.delete('/delete-post/:id', deletePost);

// // Edit post
// router.put('/edit-post/:id', upload.single('bg_image'), editPost);

export default router;
