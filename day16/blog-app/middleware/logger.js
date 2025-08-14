// middleware/logger.js
export const logger = (req, res, next) => {
  const currentTime = new Date().toLocaleString(); // Local date & time
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next(); // Pass control to next middleware/route
};
