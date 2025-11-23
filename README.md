# Inkle Backend Assignment (Node.js + Express + MongoDB)

This project implements a simple social activity feed with roles, posts, likes, follows, blocks, and a global activity wall.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and edit if needed:

```bash
cp .env.example .env
```

3. Start MongoDB locally (or use MongoDB Atlas and update `MONGO_URI` in `.env`).

4. Run the server in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

The first registered user becomes the `OWNER`.
