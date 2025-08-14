# 📚 Blog App (Node.js + Express + MVC)

A simple **Blog Application** built with **Node.js**, **Express**, and **MVC architecture**.  
Stores data in a JSON file and includes **custom middleware** for logging and error handling.

---

## 🚀 Features
- **MVC Structure** (Models, Views, Controllers)
- **CRUD Operations**:
  - Create Post
  - Read All Posts
  - Read Single Post
  - Update Post
  - Delete Post
- **Middleware**:
  - Logger (method, URL, timestamp)
  - Error handler
- **Data Persistence**: Stores posts in `posts.json`
- **REST API** ready for frontend integration

---

## 📂 Project Structure

blog-app/
├── controllers/
│ └── postController.js
├── data/
│ └── posts.json
├── middleware/
│ ├── errorHandler.js
│ └── logger.js
├── models/
│ └── post.js
├── routes/
│ └── postRoutes.js
├── app.js
├── package.json
└── README.md



---

## 🛠 Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone <your_repo_url>
cd blog-app

install dependencies by running 
 npm install 

 start the server by npm start 

 Server running at

http://localhost:3000

📌 API Endpoints
Create a Post

POST /posts
Body:

{
  "title": "My First Post",
  "content": "This is the content of my first post."
}

Get All Posts

GET /posts

Get Single Post

GET /posts/:id

Update a Post

PUT /posts/:id
Body:

{
  "title": "Updated Title",
  "content": "Updated content goes here."
}

Delete a Post

DELETE /posts/:id

🧪 Testing

Use Postman to test:

POST → Create post

GET → Get all posts

GET/:id → Get single post

PUT → Update post

DELETE → Delete post
✅ Watch terminal logs from logger.js to confirm request details.

⚙ Middleware
Logger

Logs timestamp, method, and URL of every request.

Error Handler

Catches and responds to any errors with proper status codes.

📄 License

This project is open-source and available under the MIT License. 