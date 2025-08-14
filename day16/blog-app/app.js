import express from 'express';
import postRoutes from './routes/postRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

// Logger middleware (before routes)
app.use(logger);

// Routes
app.use('/posts', postRoutes);

// Error handler middleware (after routes)
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000 http://localhost:3000');
});
