PostgreSQL setup and deployment notes for HRMS backend

Local development (recommended via Docker):

- Start a Postgres container:

```powershell
docker run --name hrms-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=hrms -p 5432:5432 -d postgres:15
```

- Or install Postgres locally and create a database/user.

- Create a `.env` in `backend/` with values (example):

```
DB_NAME=hrms
DB_USER=postgres
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

- Install dependencies and start server:

```powershell
cd backend; npm install
npm run dev
```

Notes for deployment (Heroku, Render, Fly, etc.):

- Most platforms provide a single `DATABASE_URL` environment variable. The backend reads `DATABASE_URL` when present and will use it automatically.
- For secure connections (managed Postgres), the code sets `ssl` options in production (it uses `rejectUnauthorized: false` to accommodate common managed providers). If your provider requires stricter SSL verification, adjust `backend/src/config/db.js`.
- Example `DATABASE_URL` format: `postgres://user:password@host:5432/dbname`

Other notes:
- The project previously included SQLite; if you no longer need it, you can remove `sqlite3` from `backend/package.json` and run `npm install` again.
- The server runs `sequelize.sync({ alter: true })` on startup, so tables will be created/adjusted automatically. For production, consider using proper migrations instead of `sync`.
