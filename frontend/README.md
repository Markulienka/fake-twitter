# Frontend – Fake Twitter Client

This is the frontend client for the Fake Twitter project, built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/).  
It provides user authentication, tweet management, and like functionality through a modern React interface.

---

## Running the frontend

```bash
$ cd frontend
$ npm install
$ npm run dev
```
The frontend runs at http://localhost:5173 

---

## How it works
- **Authentication:** Login/signup forms communicate with JWT-based auth API
- **User Identity:** JWT tokens are decoded client-side to get userId and username
- **Tweet Loading:** Fetches all tweets + user's liked tweet IDs in parallel
- **Tweet Creation:** Form submission creates tweets with immediate UI updates
- **Like System:** Heart icons toggle like/unlike with optimistic UI updates
- **Delete:** Users can delete their own tweets with confirmation
- **State Management:** All data synced with backend, minimal local state
- **Persistence:** All data stored in MongoDB, survives server restarts