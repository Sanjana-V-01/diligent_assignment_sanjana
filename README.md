## E‑Commerce Fullstack (Vite + React + Express)

Monorepo-style project containing a React frontend and an Express backend.

### Project Structure

```
.
├─ package.json                # Frontend (Vite) package.json
├─ src/                        # Frontend source
│  ├─ App.jsx
│  ├─ components/
│  ├─ context/
│  ├─ lib/
│  └─ pages/
├─ backend/                    # Backend (Express) service
│  ├─ package.json
│  ├─ server.js
│  └─ data/
│     └─ products.json
├─ .gitignore
└─ README.md
```

### Prerequisites
- Node.js 18+ and npm

### Frontend (Vite + React)
From the repository root (this folder):

```
npm install
npm run dev
```

Optional: set API base URL (defaults to `http://localhost:5000/api`):

Create `.env` in the project root with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Build and preview:
```
npm run build
npm run preview
```

### Backend (Express)
From `backend/`:

```
cd backend
npm install
npm run dev
```

Endpoints:
- GET `/api/products` – list products
- GET `/api/products/:id` – product details
- GET `/health` – health check

### First Run
1) Start backend:
```
cd backend && npm install && npm run dev
```
2) In another terminal, start frontend from repo root:
```
npm install && npm run dev
```
3) Open the URL printed by Vite (e.g., http://localhost:5173).



### Notes
- The frontend automatically uses `VITE_API_BASE_URL` if present; otherwise it calls `http://localhost:5000/api`.
- The backend serves static data from `backend/data/products.json`. Replace with a real database as needed.



