# CareerVerse AI – Career Risk & Reward Simulator

**Simulate Your Future Before You Choose It.**

CareerVerse AI is a production-quality career intelligence platform that helps students compare career paths using Monte Carlo simulations, risk modeling, career stability analysis, and AI disruption forecasting.

## Features

- **Career Recommendation Engine** – Questionnaire-based compatibility scoring across 11 careers
- **Monte Carlo Simulation** – 10,000 probabilistic outcomes over 15 years
- **Parallel Universe Simulator** – Side-by-side comparison of 2–3 career paths
- **Career Stability Score** – Composite metric from demand, growth, and automation resistance
- **AI Disruption Timeline** – Projections from 2026–2040 with upskilling recommendations
- **Risk vs Reward Dashboard** – Interactive radar charts and probability analytics
- **Professional Analytics UI** – Glassmorphism, dark mode, Framer Motion animations

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion, React Query, Axios |
| Backend | FastAPI, Python 3.12+ |
| Database | SQLite, SQLAlchemy ORM |
| Data Science | NumPy, Pandas, Scikit-learn, SciPy |

## Project Structure

```
CareerVerse/
├── backend/
│   └── app/
│       ├── api/           # FastAPI route handlers
│       ├── models/        # SQLAlchemy models
│       ├── schemas/       # Pydantic schemas
│       ├── services/      # Business logic
│       ├── simulation/    # Monte Carlo engine
│       └── database/      # DB setup & seed data
├── frontend/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Route pages
│       ├── charts/        # Recharts visualizations
│       ├── hooks/         # React Query hooks
│       ├── services/      # API client
│       └── types/         # TypeScript interfaces
└── README.md
```

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

The Vite dev server proxies `/api/*` requests to `http://localhost:8000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/careers` | List all careers |
| GET | `/career/{id}` | Get career details |
| POST | `/recommend` | Career recommendation from questionnaire |
| POST | `/simulate` | Run Monte Carlo simulation |
| POST | `/compare` | Parallel universe comparison |
| GET | `/dashboard/{user_id}` | User dashboard data |
| GET | `/ai-disruption/{career}` | AI disruption timeline |

## Deployment

### Backend (Render)

1. Connect your repo to Render
2. Set root directory to `backend`
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)

1. Set root directory to `frontend`
2. Set environment variable: `VITE_API_URL=https://your-api.onrender.com`
3. Deploy

## Monte Carlo Engine

The simulation models 15-year career trajectories with:

- Annual salary growth (with noise)
- Promotion probability
- Economic recession events (8% annual chance)
- Layoff risk with salary impact
- Industry growth/decline factors
- AI disruption effects increasing over time

Outputs include mean/median/worst/best case salaries, milestone probabilities (₹10L, ₹20L, ₹50L, ₹1Cr), and full distribution histograms.

## License

MIT
