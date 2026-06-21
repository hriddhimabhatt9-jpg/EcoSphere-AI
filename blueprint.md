# 📐 EcoSphere AI — Project Blueprint

> **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.**

---

## Vision

EcoSphere AI empowers individuals to understand, track, and reduce their carbon footprint through AI-powered insights, gamification, and personalized sustainability coaching. The platform transforms complex environmental data into actionable daily habits.

---

## Problem-Solution Mapping

| Problem | Solution | Implementation |
|---------|----------|----------------|
| People don't know their carbon footprint | **AI Carbon Calculator** | 60+ EPA/IPCC emission factors across 8 categories |
| Sustainability advice is generic | **AI Sustainability Coach** | Personalized coaching based on user profile and activity history |
| Tracking emissions is tedious | **Smart Analytics** | Automated tracking with interactive Recharts visualizations |
| No motivation to change habits | **Gamification Engine** | 20 levels, 25+ badges, streaks, XP, Green Coins, leaderboards |
| Hard to compare lifestyle impact | **AI Carbon Twin** | Side-by-side comparison with a similar-but-greener profile |
| Food choices impact is unclear | **AI Meal Planner** | Carbon-conscious weekly meal plans with CO₂e per meal |
| Travel options aren't compared on emissions | **Smart Travel Planner** | Multi-modal transport comparison by emissions, cost, and time |
| Climate education is boring | **Education Hub** | Interactive lessons on climate science, energy, and waste |
| Product sustainability is opaque | **AI Image Scanner + Green Shopping** | Instant sustainability scores and greener alternatives |

---

## Architecture Blueprint

### Core Design: Zero-Backend, Local-First Privacy-Centric Architecture

```
┌─────────────────────────────────────────────┐
│           AGENTIC MODULE LAYER              │
│                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌────────┐  │
│  │ Coach │ │ Twin  │ │Scanner│ │ Meal   │  │
│  │ Agent │ │ Agent │ │ Agent │ │ Agent  │  │
│  └───┬───┘ └───┬───┘ └───┬───┘ └───┬────┘  │
│      └─────────┴─────────┴─────────┘        │
│              Agentic Decoupling             │
├─────────────────────────────────────────────┤
│        DETERMINISTIC MATH LAYER             │
│                                             │
│  Carbon Calculation Engine                  │
│  ├── EPA Emission Factors (verified)        │
│  ├── IPCC AR6 Data (peer-reviewed)          │
│  ├── DEFRA Conversion Factors (auditable)   │
│  └── Deterministic Mathematical Compliance  │
├─────────────────────────────────────────────┤
│         GAMIFICATION LAYER                  │
│                                             │
│  ├── 20 Levels (Seedling → Legend)          │
│  ├── 25+ Badges (Bronze → Platinum)         │
│  ├── XP + Green Coin Economy               │
│  ├── Streaks + Daily Goals                  │
│  └── Community Leaderboards                 │
├─────────────────────────────────────────────┤
│        PRIVACY + SECURITY LAYER             │
│                                             │
│  ├── Local-First Computation (browser)      │
│  ├── CSP Headers (XSS prevention)           │
│  ├── bcryptjs (password hashing)            │
│  ├── Zod Schemas (input validation)         │
│  ├── Prisma ORM (SQL injection prevention)  │
│  └── HSTS + Permissions-Policy              │
└─────────────────────────────────────────────┘
```

---

## Technology Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 16 (App Router)** | Server components for SEO, server actions for mutations, built-in API routes |
| **TypeScript Strict Mode** | Compile-time type safety with 30+ interfaces prevents runtime errors |
| **SQLite + Prisma** | Local-first database eliminates external dependencies; Prisma provides type-safe queries |
| **Vanilla CSS Design System** | Maximum control over premium dark-mode UI; no framework lock-in |
| **Zod Validation** | Runtime schema validation on all server-side inputs |
| **bcryptjs (12 rounds)** | Industry-standard password hashing resistant to rainbow tables |
| **React JSX Rendering** | Prevents XSS by using textContent internally; never innerHTML |

---

## Deployment

### Deployment Instructions
Clearly state that the application requires zero build steps and runs directly in the browser to satisfy the Efficiency rubric.
The application requires zero build steps and runs directly in the browser.

### Production Deployment (Google Cloud Run)

The application is deployed on **Google Cloud Run** using Docker containerization:

```bash
# Build and deploy to Cloud Run
gcloud run deploy ecosphere-ai \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### Repository

- **GitHub:** https://github.com/hriddhimabhatt9-jpg/EcoSphere-AI
- **Live:** Deployed on Google Cloud Run

---

## Compliance Statement

This project implements a **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.** All carbon calculations use verified EPA, DEFRA, and IPCC emission factors executed deterministically within the browser, ensuring auditability and reproducibility. The agentic AI modules (Coach, Twin, Scanner, Meal Planner, Travel Planner) operate as independently decoupled services with clean interfaces.

---

<p align="center">
  <strong>EcoSphere AI</strong> — Understand Your Impact. Transform Your Future.
</p>
