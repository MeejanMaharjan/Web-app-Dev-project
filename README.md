# MomentDB

A full-stack movie & TV show catalog app — Express/MongoDB backend, React/Vite frontend.

## Getting Started

### Backend

```bash
cd Backend
npm install
npm run dev
```

Requires a `Backend/.env` file (gitignored) with:

```
MongoDB_URI=<your MongoDB connection string>
JWT_SECRET=<any random string>
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

To (re)populate the database with sample movies, TV shows, and the demo accounts below:

```bash
node seed.js
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Demo Logins

Created by `Backend/seed.js`. For local development only — change or remove these before any real deployment.

| Role  | Email                | Password    |
|-------|-----------------------|-------------|
| Admin | admin@momentdb.com    | Admin1234   |
| User  | user@momentdb.com     | User1234    |

Admin accounts can add/edit/delete movies and manage movie requests (`/admin/requests`). Regular accounts can browse, save a watchlist, and submit movie requests.

You can also register your own account from the app's Register page — it's a regular (non-admin) user by default.
