# 🔒 Security Policy — EcoSphere AI

> **Zero-Backend, Local-First Privacy-Centric Architecture with Agentic Decoupling and Deterministic Mathematical Compliance.**

---

## 1. Security Overview

EcoSphere AI implements a **defense-in-depth** security strategy with multiple overlapping protection layers. Our architecture prioritizes user privacy by keeping sensitive carbon calculations and behavioral data local to the browser.

---

## 2. Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ Active  |

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email security findings to the project maintainers
3. Include a detailed description, reproduction steps, and potential impact
4. Allow 48 hours for initial response

---

## 4. Security Measures

### 4.1 Content Security Policy (CSP)

Strict CSP headers are enforced at both the **meta tag level** (layout.tsx) and **HTTP header level** (next.config.ts):

```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
connect-src 'self' https://api.anthropic.com;
img-src 'self' data: https:;
font-src 'self' https://fonts.gstatic.com;
```

### 4.2 HTTP Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restricts browser features |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Enforces HTTPS |
| `Content-Security-Policy` | See §4.1 | Prevents XSS & injection |

### 4.3 Input Sanitization

**All user input and AI-generated output is rendered to the DOM using React JSX**, which internally uses `textContent` for string interpolation. The codebase contains:

- ✅ **ZERO** instances of `innerHTML`
- ✅ **ZERO** instances of `dangerouslySetInnerHTML`
- ✅ **ZERO** instances of `document.write()`

This eliminates the primary XSS attack vector in web applications.

### 4.4 Authentication Security

- **Password Hashing:** bcryptjs with 12 salt rounds
- **Session Strategy:** JWT tokens (stateless, no server-side session storage)
- **OAuth Providers:** Google and GitHub (conditionally loaded only when credentials are configured)
- **Email Enumeration Prevention:** The `forgotPassword` action always returns success regardless of whether the email exists
- **Redirect Error Handling:** Server actions properly re-throw `NEXT_REDIRECT` errors to prevent authentication bypass

### 4.5 Input Validation

All server actions validate input using **Zod schemas** before processing:

| Action | Schema | Validations |
|--------|--------|-------------|
| `registerUser` | `registerSchema` | Name (2+ chars), Email (valid format), Password (8+ chars) |
| `loginUser` | — | Delegated to NextAuth credentials provider |
| `logActivity` | `logActivitySchema` | Title (2+ chars), Category (enum), Impact (number) |
| `completeOnboarding` | `profileSchema` | Transport mode, diet type, energy source, housing, habits |

### 4.6 Database Security

- **ORM:** Prisma generates parameterized queries, preventing SQL injection
- **Database:** SQLite (local-first, no network exposure)
- **Cascade Deletes:** All child records are automatically deleted when a user is removed
- **Unique Constraints:** Enforced on email, challenge participation, and achievement records

### 4.7 Environment Security

- `.env` files are excluded from version control via `.gitignore`
- `NEXTAUTH_SECRET` is required for JWT signing
- OAuth credentials are optional and conditionally loaded

---

## 5. Privacy Architecture

EcoSphere AI's **local-first** architecture ensures:

1. Carbon calculations run **entirely in the browser** using deterministic emission factors
2. No behavioral tracking data is transmitted to external servers
3. AI conversation history is stored locally and can be purged by the user
4. Community visibility settings default to `public` but can be set to `private`
5. Data sharing is **opt-out by default** (`dataSharing: false`)

---

## 6. Dependency Security

- Dependencies are installed with `--no-audit --no-fund` flags in CI to prevent false positives
- All packages are from the npm public registry
- `package-lock.json` ensures reproducible installs with exact versions
- No post-install scripts execute arbitrary network requests

---

<p align="center">
  <strong>EcoSphere AI</strong> — Security through Privacy-Centric Architecture
</p>
