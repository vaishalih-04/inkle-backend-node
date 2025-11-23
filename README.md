# 🚀 Inkle Backend – Social Activity Feed API
### Node.js | Express | MongoDB | JWT Authentication

This project is a backend implementation of a social activity feed system.  
It supports authentication, role-based access, posts, likes, follows, blocks, and a global activity feed.

---

## 🌐 Live URL
https://inkle-backend-node.onrender.com

## 📦 GitHub Repository
https://github.com/vaishalih-04/inkle-backend-node

---

## 🛠️ Tech Stack
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Render Deployment  
- MongoDB Atlas  

---

## ⚙️ Installation
```bash
git clone https://github.com/vaishalih-04/inkle-backend-node.git
cd inkle-backend-node
npm install
cp .env.example .env
npm run dev
```

---

## 🔐 Environment Variables
```
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 📂 Folder Structure
```
inkle-backend-node/
├── server.js
├── package.json
├── .env.example
├── README.md
└── src/
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

---

## 🧪 API Testing
Use:
- Postman  
- Thunder Client  
- curl  

---

## 📝 Main Endpoints

### Auth
- POST /api/auth/signup  
- POST /api/auth/login  

### Posts
- POST /api/posts  
- GET /api/posts  
- DELETE /api/posts/:id  

### Follows
- POST /api/follows/:id  
- DELETE /api/follows/:id  

### Blocks
- POST /api/blocks/:id  
- DELETE /api/blocks/:id  

### Activity Feed
- GET /api/activity  

---

## 🎯 Final Notes
This backend is deployment-ready and can be connected to any frontend or mobile application.

