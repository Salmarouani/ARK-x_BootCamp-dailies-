import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// This helps get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON file
const filePath = path.join(__dirname, '../data/posts.json');

// Helper function to read data
const readData = () => {
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data
const writeData = (data) => {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// CRUD functions
export const getAllPosts = () => readData();

export const getPostById = (id) => {
  const posts = readData();
  return posts.find((post) => post.id === id);
};

export const createPost = (post) => {
  const posts = readData();
  posts.push(post);
  writeData(posts);
  return post;
};

export const updatePost = (id, updatedPost) => {
  let posts = readData();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...updatedPost };
  writeData(posts);
  return posts[index];
};

export const deletePost = (id) => {
  let posts = readData();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;
  const deleted = posts.splice(index, 1);
  writeData(posts);
  return deleted[0];
};
