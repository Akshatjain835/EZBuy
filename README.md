# EzBuy

EzBuy is a full-featured e-commerce platform where users can register, log in, add addressess and shop for products.
It is built with a React frontend and a Node.js/Express backend, using MongoDB for data storage.

![React](https://img.shields.io/badge/Frontend-React-blue?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)

---

## 🌟 Features

- 📝 User registration and login (JWT authentication)
- 🏠 Address management (add, edit, delete)
- 🛒 Product browsing (extendable)
- 📦 Order placement (extendable)
- 🔔 Toast notifications for feedback
- 📱 Responsive UI
-  Admins can manage products, users, orders, and platform settings separately from regular users.
---

## 🛠️ Tech Stack

| Layer          | Technology                    |
|----------------|------------------------------|
| **Frontend**   | React, Tailwind CSS          |
| **Backend**    | Node.js, Express             |
| **Database**   | MongoDB (Mongoose)           |
| **Authentication** | JWT, bcrypt               |

---

## 🌐 Live Demo

- 🔗 **Frontend**: [https://ez-buy-91sb.vercel.app](https://ez-buy-91sb.vercel.app)
- 🔗 **Backend**: [https://ezbuyy1.onrender.com](https://ezbuyy1.onrender.com)

---

## 🧪 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ezbuy.git
cd ezbuy
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```
MONGO_URI=your_mongodb_connection_string
CLIENT_SECRET_KEY=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Update the API base URL in your frontend config if needed:

```js
// Example: client/src/config/index.js
export const API_BASE_URL = "https://ezbuyy1.onrender.com";
```

Start the frontend:

```bash
npm start
```

---

## 📦 Project Structure

```
ezbuy/
├── client/      # React frontend
│   └── src/
│       └── pages/
│           └── auth/
│               ├── Login.jsx
│               └── Register.jsx
│       └── components/
│           └── common/
│               └── CommonForm.jsx
│       └── redux/
│           └── authslice/
│               └── authSlice.js
│       └── config/
│           └── index.js
├── server/      # Node.js backend
│   └── controllers/
│       ├── user.controller.js
│       └── shop/
│           └── address.controller.js
│   └── models/
│       └── users.model.js
│   └── routes/
│       └── shop/
│           └── address.route.js
│   └── app.js
│   └── .env
└── README.md
```

---

## 🔑 Environment Variables

**Backend (`server/.env`):**

- `MONGO_URI` - MongoDB connection string
- `CLIENT_SECRET_KEY` - JWT secret key
- `PORT` - Server port (default: 5000)

---

## 🚀 API Endpoints

### User Authentication

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user

### Address Management

- `POST /api/address/add` - Add address
- `GET /api/address/get/:userId` - Get all addresses for a user
- `PUT /api/address/update/:userId/:addressId` - Update address
- `DELETE /api/address/delete/:userId/:addressId` - Delete address

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT
