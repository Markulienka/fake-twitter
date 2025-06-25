# Backend – Fake Twitter API

This is the backend API for the Fake Twitter project, built with [NestJS](https://nestjs.com).  
It provides simple endpoints for managing tweets stored in memory.

---

## Running the Backend

```bash
$ cd backend
$ npm install
$ npm run start:dev
```
The backend runs at http://localhost:3000

---

## API Endpoints
- GET /tweets — fetch all current tweets
- POST /tweets — create a new tweet (body: { text: string, name: string }), generates a unique ID automatically
- DELETE /tweets/:id — delete a tweet by its ID

