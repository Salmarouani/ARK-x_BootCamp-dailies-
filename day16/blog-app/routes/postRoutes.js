import { Router } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = Router();

router.get('/', getAllPosts);       // GET /posts
router.get('/:id', getPostById);    // GET /posts/:id
router.post('/', createPost);       // POST /posts
router.put('/:id', updatePost);     // PUT /posts/:id
router.delete('/:id', deletePost);  // DELETE /posts/:id

export default router;
