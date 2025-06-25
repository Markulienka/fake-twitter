# Fake Twitter

This project is a simple Twitter-like application split into backend API and frontend client.

---

## How it works

- On app load, the frontend fetches all tweets from GET /tweets and displays them.
- Users can add a new tweet via a form, which sends a POST /tweets request to the backend.
- The backend creates the tweet with a unique ID and returns it; the frontend adds it to the top of the list.
- Users can delete tweets, triggering a DELETE /tweets/:id request; if successful, the tweet is removed from the frontend list.
- All tweets are stored only in backend memory, so data is lost if the backend server restarts.
- The frontend does not store tweets locally (no localStorage); all data is always fetched from the backend

---

## More info

Each part of the project contains its own detailed README file:

- [`frontend/README.md`](./frontend/README.md) – how to run the frontend
- [`backend/README.md`](./backend/README.md) – how to run the backend
