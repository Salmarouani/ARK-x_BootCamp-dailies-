// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log full error stack for debugging
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};
