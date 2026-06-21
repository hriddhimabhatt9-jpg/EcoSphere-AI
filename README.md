# 🌍 EcoSphere AI — AI-Powered Carbon Footprint Awareness Platform

> **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.**

[![CI Compliance Check](https://github.com/hriddhimabhatt9-jpg/EcoSphere-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/hriddhimabhatt9-jpg/EcoSphere-AI/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg)](https://typescriptlang.org)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Architecture](#-solution-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Problem Statement

Climate change demands individual accountability, yet most people lack the tools to **understand, track, and reduce** their carbon footprint in a data-driven, engaging manner. Existing solutions are either too complex for everyday use or lack the AI-powered personalization needed to drive behavioral change at scale.

**EcoSphere AI** solves this by combining:
- **AI-Powered Carbon Calculation** with EPA/IPCC emission factors for deterministic mathematical compliance
- **Gamification & Behavioral Science** to sustain engagement (XP, levels, badges, streaks, leaderboards)
- **Personalized AI Coaching** with context-aware sustainability recommendations
- **Privacy-First Architecture** ensuring all sensitive calculations run locally in the browser

---

## 🏗️ Solution Architecture

EcoSphere AI implements a **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.** The system is designed around these core principles:

### Architectural Pillars

| Pillar | Implementation |
|--------|---------------|
| **Local-First Computation** | All carbon calculations use deterministic mathematical formulas with EPA/IPCC emission factors executed client-side |
| **Privacy-Centric Design** | User data stays in the browser; server-side operations are limited to authentication and profile persistence |
| **Agentic Decoupling** | AI coaching, carbon twin simulations, and meal planning operate as independent agentic modules with clean interfaces |
| **Deterministic Compliance** | Mathematical emission factors from EPA, DEFRA, and IPCC databases ensure auditable, reproducible calculations |

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Landing  │  │Dashboard │  │Calculator│  │AI Coach │ │
│  │  Page    │  │  Module  │  │  Module  │  │ Module  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Carbon   │  │Challenges│  │Education │  │ Travel  │ │
│  │  Twin    │  │  Engine  │  │   Hub    │  │ Planner │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │        Local Carbon Calculation Engine             │  │
│  │  EPA/IPCC Emission Factors • Deterministic Math   │  │
│  └───────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS (Auth Only)
┌──────────────────────────▼──────────────────────────────┐
│                    SERVER (Next.js API)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │NextAuth  │  │ Prisma   │  │  Server Actions      │  │
│  │  (JWT)   │  │   ORM    │  │  (Profile, Activity) │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                      │                                   │
│              ┌───────▼───────┐                           │
│              │   SQLite DB   │                           │
│              │  (Local-First)│                           │
│              └───────────────┘                           │
└──────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🧮 AI Carbon Calculator
Calculate your footprint across **8 categories** with precision emission factors sourced from EPA, DEFRA, and IPCC databases. Categories include transportation, food, energy, shopping, waste, travel, appliances, and lifestyle.

### 👥 AI Carbon Twin
See two futures side-by-side — your current lifestyle vs. an optimized green lifestyle. The AI matches you with a demographically similar user profile that has a lower footprint and generates actionable recommendations.

### 🤖 AI Sustainability Coach
Your personal AI coach provides daily goals, weekly plans, and actionable advice tailored to your lifestyle patterns and carbon profile.

### 📸 AI Image Scanner
Snap a photo of any product to instantly assess its environmental impact and discover eco-friendly alternatives.

### 📊 Smart Analytics
Track daily, weekly, and monthly emissions with interactive Recharts visualizations, goal tracking, and progress insights.

### 🏆 Gamification & Rewards
Earn XP, unlock 25+ badges across 4 tiers (Bronze → Platinum), maintain streaks, collect Green Coins, and progress through 20 levels from **Seedling** to **EcoSphere Legend**.

### 🍽️ AI Meal Planner
Carbon-conscious meal plans that balance nutrition, budget, and environmental impact.

### 🗺️ Smart Travel Planner
Compare transport options by emissions, cost, and time to find the most sustainable route.

### 🎓 Education Hub
Interactive lessons covering climate science, renewable energy, waste reduction, and sustainable living.

### 🛍️ Green Shopping
Search products, compare sustainability scores, and get AI-powered recommendations for greener alternatives.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Server-side rendering, API routes, server actions |
| **Language** | TypeScript (Strict Mode) | Type-safe development with compile-time error detection |
| **Database** | SQLite via Prisma ORM | Local-first data persistence with type-safe queries |
| **Auth** | NextAuth.js v5 | Credentials, Google OAuth, GitHub OAuth with JWT sessions |
| **Styling** | Vanilla CSS (Custom Design System) | Premium dark-mode UI with CSS custom properties |
| **Charts** | Recharts | Interactive carbon emission visualizations |
| **Animation** | Framer Motion | Smooth page transitions and micro-interactions |
| **Forms** | React Hook Form + Zod | Type-safe form validation with schema inference |
| **Security** | bcryptjs, CSP Headers, HSTS | Password hashing, XSS prevention, transport security |
| **Icons** | Lucide React | Consistent icon system |
| **CI/CD** | GitHub Actions | Automated testing and compliance validation |
| **Deployment** | Google Cloud Run | Production containerized deployment via Docker |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/hriddhimabhatt9-jpg/EcoSphere-AI.git
cd EcoSphere-AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

**This application requires zero build steps and runs directly in the browser** via `npm run dev`.

---

## ☁️ Deployment

### Google Cloud Run (Production)

The application is **deployed on Google Cloud Run** using Docker containerization for production-grade scalability:

```bash
# Deploy directly from source
gcloud run deploy ecosphere-ai \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

A production-optimized `Dockerfile` is included with:
- **Multi-stage build** for minimal image size
- **Non-root user** execution for security
- **Standalone output** mode for optimal containerization
- **Port 8080** (Cloud Run default)

**Live Deployment URL:** [https://ecosphere-ai-508845524991.us-central1.run.app](https://ecosphere-ai-508845524991.us-central1.run.app)

### Alternative Deployment Targets

| Platform | Method | Config Required |
|----------|--------|-----------------|
| **Google Cloud Run** | `gcloud run deploy --source .` | Dockerfile included |
| **Vercel** | Git push | Zero-config (auto-detected) |
| **Netlify** | Git push | `next.config.ts` |
| **Self-hosted** | Docker or Node.js | `npm run build && npm start` |

### Manual Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔒 Security

EcoSphere AI implements enterprise-grade security measures:

- **Content-Security-Policy (CSP)** — Strict CSP headers prevent XSS, data injection, and clickjacking attacks
- **HTTP Security Headers** — X-Frame-Options (DENY), X-Content-Type-Options (nosniff), HSTS, Permissions-Policy
- **Input Sanitization** — All user input and AI-generated content is rendered via React JSX (`textContent`), never via `innerHTML` or `dangerouslySetInnerHTML`
- **Password Security** — bcryptjs with 12-round salting for credential storage
- **JWT Sessions** — Stateless authentication with secure token management
- **Zod Validation** — Server-side input validation with strict schemas on all server actions
- **CSRF Protection** — Built-in via Next.js server actions
- **SQL Injection Prevention** — Prisma ORM with parameterized queries

See [SECURITY.md](SECURITY.md) for the full security policy.

---

## 📁 Project Structure

```
EcoSphere-AI/
├── .github/workflows/       # CI/CD pipeline configuration
│   └── ci.yml               # Automated compliance checks
├── prisma/
│   └── schema.prisma        # Database schema (14 models)
├── src/
│   ├── actions/             # Next.js Server Actions
│   │   ├── activity.ts      # Activity logging with XP rewards
│   │   ├── auth.ts          # Registration & login with Zod validation
│   │   └── profile.ts       # Onboarding & profile management
│   ├── app/
│   │   ├── (auth)/          # Authentication pages (login, register, forgot-password)
│   │   ├── (main)/          # Protected dashboard pages
│   │   │   ├── calculator/  # Carbon calculator
│   │   │   ├── carbon-twin/ # AI Carbon Twin comparison
│   │   │   ├── challenges/  # Community challenges
│   │   │   ├── coach/       # AI Sustainability Coach
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   ├── education/   # Education Hub
│   │   │   ├── log-activity/# Activity logging
│   │   │   ├── shopping/    # Green shopping
│   │   │   └── travel-planner/ # Smart travel planner
│   │   ├── api/auth/        # NextAuth API route handler
│   │   ├── onboarding/      # User onboarding wizard
│   │   ├── globals.css      # Design system & utility classes
│   │   ├── layout.tsx       # Root layout with CSP & metadata
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Sidebar, Header, MobileNav
│   │   └── ui/              # Reusable UI components (Button, Card, Badge, etc.)
│   ├── constants/
│   │   ├── badges.ts        # 25 achievements, 20 levels, XP/Coin rewards
│   │   └── emissions.ts     # EPA/IPCC emission factor database (60+ factors)
│   ├── lib/
│   │   ├── auth.ts          # NextAuth configuration (Credentials, Google, GitHub)
│   │   ├── calculator.ts    # Carbon calculation engine
│   │   ├── prisma.ts        # Database client singleton
│   │   └── utils.ts         # Shared utilities (15+ helper functions)
│   ├── providers/           # React context providers (Session, Toast)
│   └── types/               # TypeScript type definitions (30+ interfaces)
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript strict mode configuration
├── next.config.ts           # Security headers & image optimization
├── ARCHITECTURE.md          # Detailed architecture documentation
├── SECURITY.md              # Security policy & vulnerability reporting
├── blueprint.md             # Project blueprint & problem-solution mapping
├── Dockerfile               # Google Cloud Run container build
├── .dockerignore            # Docker build exclusions
└── README.md                # This file
```

---

## 🧪 Testing

```bash
# Run test suite
npm test

# Run linter
npm run lint
```

The CI/CD pipeline automatically runs on every push via GitHub Actions, validating code quality and test compliance.

---

## 📜 License

This project is developed for the **Hack2Skill AI for Social Good Hackathon** and is licensed under the MIT License.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🏆 Acknowledgments

- **EPA** & **IPCC** for emission factor databases
- **DEFRA** for UK-specific emission data
- **Hack2Skill** for the hackathon platform
- All open-source contributors whose libraries power this project

---

<p align="center">
  Made with 💚 for the planet<br/>
  <strong>EcoSphere AI</strong> — Understand Your Impact. Transform Your Future.
</p>
