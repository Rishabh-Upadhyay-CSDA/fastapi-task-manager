# TaskFlow Pro

A modern, full-stack Task Management application featuring persistent cloud storage, secure JWT authentication, and a responsive gradient-styled dashboard UI. Built with **FastAPI**, **React**, **Tailwind CSS**, and **PostgreSQL**.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS (v4)
- **Backend:** FastAPI, Python, SQLAlchemy, Alembic (Migrations), Pytest
- **Database:** PostgreSQL (Neon) for Production, SQLite (`:memory:`) for Isolated Testing
- **Deployment:** Vercel (Frontend), Render (Backend/API)

---

## Features

- **Authentication:** Secure user sign-up, login, password updates, and JWT session handling.
- **Task Management:** Create, read, update (completion toggle), and delete tasks with real-time filtering (All, Pending, Completed).
- **Persistent Cloud Storage:** Database connections stay persistent across backend server sleeps/restarts via Neon PostgreSQL.
- **Responsive Gradient UI:** Styled using Tailwind CSS v4, featuring dynamic glassmorphism cards and layout footers.
- **Isolated Testing:** Complete unit test coverage via Pytest running against an isolated in-memory SQLite database.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Git

---

### 1. Backend Setup (FastAPI)

1. Clone the repository and navigate to the project root:
   ```text
   git clone https://github.com/Rishabh-Upadhyay-CSDA/fastapi-task-manager.git
   cd fastapi-task-manager
   ```

3. Create and activate a virtual environment:
   ```text
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

4. Install backend dependencies:
   pip install -r requirements.txt

5. Configure environment variables in a `.env` file at root:
   ```text
   DATABASE_URL=postgresql://user:password@ep-example.neon.tech/neondb?sslmode=require
   SECRET_KEY=paste_your_own_super_secret_jwt_key_here
   ```

6. Run database migrations:
   alembic upgrade head

7. Start the FastAPI development server:
   uvicorn main:app --reload

   API docs available at: http://localhost:8000/docs

---

### 2. Frontend Setup (React / Vite)

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Configure environment variables in `frontend/.env`:
   VITE_API_URL=http://localhost:8000

4. Run the Vite development server:
   npm run dev

   App available at: http://localhost:5173

---

## Running Automated Tests

Tests use an isolated, in-memory SQLite database so your production database is never modified during testing.

Run from the root directory:
pytest

---

## Deployment Configuration

- **Render (Backend):** Set Environment Variable `DATABASE_URL` pointing to your Neon PostgreSQL URI.
- **Render (Backend):** Set Environment Variable `SECRET_KEY`.
- **Vercel (Frontend):** Set Environment Variable `VITE_API_URL` pointing to your Render backend API URL.

---

## License

Distributed under the MIT License. See LICENSE for more information.
