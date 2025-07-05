# Backend – Fake Twitter API

This is the backend API for the Fake Twitter project, built with [NestJS](https://nestjs.com), [MongoDB](https://www.mongodb.com/), and JWT authentication.  
It provides secure endpoints for user authentication, tweet management, and like functionality with persistent data storage.

---

## Running the Backend

```bash
$ cd backend
$ npm install
$ npm run start:dev
```
The backend runs at http://localhost:3000

---

## API Documentation 

The Swagger UI for the backend API is available at:

http://localhost:3000/api

You can find the complete OpenAPI documentation here and test all endpoints directly (including JWT authentication via the Authorize button).

---

## API Endpoints

### Authentication
- POST /auth/signup — register new user (body: { username, email, password })
- POST /auth/login — login user (body: { username, password })

### Tweets
- GET /tweets?userId={id} — fetch all tweets with author names
- POST /tweets — create new tweet (body: { text, userId })
- DELETE /tweets/:id — delete tweet by ID

### Likes
- POST /likes/:tweetId — like a tweet (body: { userId })
- DELETE /likes/:tweetId — unlike a tweet (body: { userId })
- GET /likes/user/:userId — get all liked tweet IDs for user

