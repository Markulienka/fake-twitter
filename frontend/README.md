# Frontend – Fake Twitter Client

This is the frontend client for the Fake Twitter project, built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).  
It allows users to view, create, and delete tweets by communicating with the backend REST API.

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
- On startup, tweets are fetched from GET /tweets
- Submitting a form sends a POST /tweets request with { name, text }
- Clicking the delete button calls DELETE /tweets/:id
- State is updated immediately after successful API responses
- There is no tweet persistence beyond server runtime