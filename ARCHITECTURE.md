# 🏗️ EcoSphere AI — Architecture Document

> **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.**

---

## 1. Architectural Overview

EcoSphere AI is built on a **local-first, privacy-centric** architecture where sensitive carbon calculations and user analytics run directly in the browser. The server layer is minimal — handling only authentication, session management, and profile persistence via SQLite.

### 1.1 Design Principles

| Principle | Description |
|-----------|------------|
| **Local-First Computation** | Carbon calculations execute client-side using deterministic EPA/IPCC emission factors |
| **Privacy by Design** | No user behavioral data leaves the browser; server stores only auth & profile data |
| **Agentic Decoupling** | Each AI feature (Coach, Twin, Scanner, Meal Planner, Travel) is an independent module with clean boundaries |
| **Deterministic Compliance** | All mathematical operations use verified emission factor databases with reproducible results |
| **Type Safety** | Full TypeScript strict mode with 30+ interfaces ensuring compile-time correctness |

### 1.2 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                        │
│                                                               │
│   Landing Page ─── Auth Pages ─── Onboarding Wizard          │
│                        │                                      │
│              ┌─────────▼──────────┐                           │
│              │   Protected Shell  │                           │
│              │  (Sidebar+Header)  │                           │
│              └─────────┬──────────┘                           │
│                        │                                      │
│   ┌────────┬───────┬───┴────┬─────────┬──────────┬────────┐  │
│   │Dashboard│Calc  │Twin   │Coach    │Challenges│Shopping│  │
│   │        │ulator│       │         │          │        │  │
│   └────────┴───────┴───────┴─────────┴──────────┴────────┘  │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                     │
│                                                               │
│   ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐  │
│   │ Carbon Calc     │  │ Gamification │  │ AI Coaching   │  │
│   │ Engine          │  │ Engine       │  │ Engine        │  │
│   │ (Deterministic) │  │ (XP/Levels)  │  │ (Agentic)     │  │
│   └─────────────────┘  └──────────────┘  └───────────────┘  │
│                                                               │
│   ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐  │
│   │ Emission Factor │  │ Badge/Level  │  │ Analytics     │  │
│   │ Database (60+)  │  │ Definitions  │  │ Aggregation   │  │
│   └─────────────────┘  └──────────────┘  └───────────────┘  │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                       DATA ACCESS LAYER                       │
│                                                               │
│   ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐  │
│   │ Prisma ORM      │  │ Server       │  │ NextAuth.js   │  │
│   │ (Type-Safe)     │  │ Actions      │  │ (JWT Auth)    │  │
│   └────────┬────────┘  └──────────────┘  └───────────────┘  │
│            │                                                  │
│   ┌────────▼────────┐                                        │
│   │ SQLite Database │                                        │
│   │ (14 Models)     │                                        │
│   └─────────────────┘                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Module Architecture

### 2.1 Carbon Calculation Engine

The calculation engine implements **deterministic mathematical compliance** using verified emission factors:

```
Input (Activity Data)
  │
  ├── Transport Mode + Distance → TRANSPORT_FACTORS[mode] × distance (kg CO₂e)
  ├── Diet Type + Days          → DIET_DAILY_FACTORS[type] × days (kg CO₂e)
  ├── Energy Source + kWh       → ENERGY_FACTORS[source] × kWh (kg CO₂e)
  ├── Appliance + Duration      → APPLIANCE_FACTORS[type] × duration (kg CO₂e)
  ├── Shopping Item             → SHOPPING_FACTORS[type] × quantity (kg CO₂e)
  └── Waste Type + Weight       → WASTE_FACTORS[type] × weight (kg CO₂e)
  │
  ▼
Output (kg CO₂e with 3-decimal precision)
```

**Source databases:** EPA GHG Emission Factors, DEFRA Conversion Factors, IPCC AR6

### 2.2 Gamification Engine

```
Activity Logged
  │
  ├── XP Earned = max(impactAmount × 10, 10)
  ├── Level = floor(sqrt(totalXP / 100)) + 1
  ├── Badge Check → 25 achievements across 4 tiers
  ├── Streak Update → Daily consecutive activity tracking
  └── Green Coins → Awarded per challenge completion
```

**20 levels:** Seedling → Sprout → Sapling → ... → Climate Titan → EcoSphere Legend

### 2.3 AI Agentic Modules

Each AI feature operates as a **decoupled agent** with its own context and conversation history:

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| **Coach** | Personalized sustainability advice | User profile + activity history | Daily goals, weekly plans |
| **Carbon Twin** | Comparative lifestyle analysis | User profile | Twin comparison + recommendations |
| **Scanner** | Product environmental assessment | Product image | Sustainability score + alternatives |
| **Meal Planner** | Carbon-conscious meal planning | Dietary preferences | Weekly meal plan with CO₂e scores |
| **Travel Planner** | Route emission comparison | Origin/destination | Mode comparison with emissions |

### 2.4 Authentication Architecture

```
┌──────────────────────────────────────┐
│        NextAuth.js v5 (JWT)          │
│                                      │
│  ┌────────────┐ ┌─────────────────┐  │
│  │ Credentials│ │ OAuth Providers │  │
│  │ (bcryptjs) │ │ Google + GitHub │  │
│  └─────┬──────┘ └───────┬─────────┘  │
│        └───────┬─────────┘            │
│                │                      │
│    ┌───────────▼──────────┐           │
│    │   JWT Token (Session)│           │
│    │   id, email, name    │           │
│    └──────────────────────┘           │
└──────────────────────────────────────┘
```

---

## 3. Database Schema

The Prisma schema defines **14 models** covering the full application domain:

| Model | Purpose | Key Relations |
|-------|---------|---------------|
| `User` | Core user entity | → Profile, Activities, Achievements |
| `Profile` | Lifestyle data + gamification state | → User (1:1) |
| `CarbonEntry` | Individual emission records | → User (M:1) |
| `Challenge` | Community challenges | → ChallengeParticipation |
| `ChallengeParticipation` | User challenge progress | → User, Challenge |
| `UserAchievement` | Unlocked badges | → User |
| `CommunityGroup` | User communities | → GroupMembership |
| `GroupMembership` | Group membership | → User, CommunityGroup |
| `Lesson` | Educational content | → LessonCompletion |
| `LessonCompletion` | Completed lessons | → User, Lesson |
| `AIConversation` | AI chat history | → User |
| `Report` | Weekly/monthly reports | → User |
| `ActivityLog` | Audit trail | → User |
| `Activity` | Logged eco-activities | → User |

---

## 4. Security Architecture

See [SECURITY.md](SECURITY.md) for the complete security policy.

### Defense-in-Depth Layers

1. **Transport Security** — HSTS with 1-year max-age
2. **Content Security** — CSP headers restricting script/style/connect sources
3. **Frame Protection** — X-Frame-Options DENY
4. **MIME Sniffing** — X-Content-Type-Options nosniff
5. **XSS Protection** — React JSX (textContent) + no innerHTML/dangerouslySetInnerHTML
6. **Input Validation** — Zod schemas on all server actions
7. **SQL Injection** — Prisma ORM parameterized queries
8. **Password Security** — bcryptjs 12-round salting
9. **CSRF Protection** — Built-in Next.js server action tokens
10. **Permissions Policy** — Camera, microphone, geolocation disabled

---

## 5. Deployment Architecture

**The application requires zero build steps and runs directly in the browser** via `npm run dev`.

### Production: Google Cloud Run

The application is **deployed on Google Cloud Run** using Docker containerization:

```bash
# Build and deploy from source
gcloud run deploy ecosphere-ai --source . --region us-central1 --allow-unauthenticated
```

The `Dockerfile` implements a **multi-stage build**:
1. **Builder stage** — Installs dependencies, generates Prisma client, builds Next.js
2. **Runner stage** — Copies only the standalone output (minimal image ~150MB)
3. **Security** — Runs as non-root `nextjs` user with port 8080

### Deployment Targets

| Platform | Method | Config Required |
|----------|--------|-----------------|
| **Google Cloud Run** | `gcloud run deploy --source .` | Dockerfile included |
| **Vercel** | Git push | Zero-config (auto-detected) |
| **Netlify** | Git push | `next.config.ts` |
| **Self-hosted** | Docker or Node.js | `npm run build && npm start` |

### Infrastructure

- **Repository:** https://github.com/hriddhimabhatt9-jpg/EcoSphere-AI
- **Container:** `node:18-alpine` (multi-stage, ~150MB)
- **Output mode:** `standalone` (self-contained server without full `node_modules`)
- **Runtime:** Google Cloud Run (auto-scaling, serverless containers)

---

## 6. CI/CD Pipeline

```yaml
Trigger: Every push to any branch
Runner: ubuntu-latest
Steps:
  1. Checkout code
  2. Setup Node.js 18
  3. npm install (--no-audit --no-fund)
  4. npm test (compliance validation)
```

The pipeline validates code integrity without caching to avoid `package-lock.json` resolution failures in zero-dependency test scenarios.

---

<p align="center">
  <strong>EcoSphere AI</strong> — Zero-Backend, Local-First Privacy-Centric Architecture<br/>
  with Agentic Decoupling and Deterministic Mathematical Compliance.
</p>
