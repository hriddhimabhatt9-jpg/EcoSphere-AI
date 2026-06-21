# Security Policy

## Supported Versions

We only provide security updates for the latest major version of the application.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of EcoSphere AI very seriously. If you discover a security vulnerability within this project, please send an e-mail to our security team at `security@ecosphere.ai` rather than creating a public issue. 

Please include the following information in your report:
- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

We will attempt to acknowledge your report within 48 hours and will provide a timeline for fixing the vulnerability.

## Security Features Enabled

This repository enforces strict enterprise security guidelines, including:
- HTTP Security Headers (CSP, HSTS, X-Frame-Options) via Next.js config
- Secure cookie handling via NextAuth
- Password hashing with Bcrypt
- API Route rate limiting considerations
- Dependency vulnerability scanning via GitHub Dependabot
