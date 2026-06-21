FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN apk add --no-cache libc6-compat python3 make g++ openssl
RUN npm install --ignore-scripts --no-audit --no-fund

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV DATABASE_URL="file:/tmp/dev.db"
ENV AUTH_URL="https://ecosphere-ai-508845524991.us-central1.run.app"
ENV AUTH_TRUST_HOST="true"
ENV AUTH_SECRET="dev-secret-ecosphere-ai-change-in-production-abc123"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 8080

CMD ["sh", "-c", "cp prisma/dev.db /tmp/dev.db && node server.js"]
