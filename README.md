# Fake Twitter

This project is a full-stack Twitter-like application with user authentication, tweet management, and like functionality.

**Tech Stack:**
- **Backend:** NestJS, MongoDB, JWT authentication
- **Frontend:** React, TypeScript, Vite, TailwindCSS

---

## Features

### Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- JWT-based user identity (no separate userId/username storage)
- Automatic token validation and logout for invalid/expired tokens

### Tweet Management
- Create, view, and delete tweets
- Each tweet shows author name and like count
- Real-time updates after tweet operations

### Like System
- Like/unlike tweets with heart icons (❤️/🤍)
- Efficient like state management using dedicated likes collection
- Single API call to fetch all user's liked tweets
- Optimistic UI updates for better user experience

### Data Persistence
- All data stored in MongoDB database
- Persistent user accounts and tweet history
- Dedicated collections for users, tweets, and likes

---

## How it works

### User Flow
1. **Login/Signup:** Users register or login, receiving a JWT token
2. **Home Page:** Displays all tweets with correct like states for the logged-in user
3. **Tweet Creation:** Users can create new tweets that appear immediately
4. **Like/Unlike:** Toggle likes with real-time count updates
5. **Delete:** Users can delete their own tweets

### Technical Flow
- **Authentication:** JWT tokens contain userId and username, stored only in localStorage
- **Tweet Loading:** Single API call fetches all tweets + single call for user's liked tweet IDs
- **Like Management:** Efficient POST/DELETE endpoints for like/unlike operations
- **State Sync:** Frontend state always reflects backend data after operations

---

## More info

Each part of the project contains its own detailed README file:

- [`frontend/README.md`](./frontend/README.md) – how to run the frontend
- [`backend/README.md`](./backend/README.md) – how to run the backend
