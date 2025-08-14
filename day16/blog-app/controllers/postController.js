import { getAllPosts as modelGetAll, getPostById as modelGetById, createPost as modelCreate, updatePost as modelUpdate, deletePost as modelDelete } from '../models/post.js';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs

// GET all posts
export const getAllPosts = (req, res) => {
  const posts = modelGetAll();
  res.json(posts);
};

// GET single post
export const getPostById = (req, res) => {
  const post = modelGetById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
};

// CREATE post
export const createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const newPost = { id: uuidv4(), title, content };
  const savedPost = modelCreate(newPost);
  res.status(201).json(savedPost);
};

// UPDATE post
export const updatePost = (req, res) => {
  const updated = modelUpdate(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(updated);
};

// DELETE post
export const deletePost = (req, res) => {
  const deleted = modelDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json({ message: 'Post deleted', deleted });
};
