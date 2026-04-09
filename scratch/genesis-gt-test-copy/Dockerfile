# Use the standard Next.js Dockerfile pattern
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code with build-time environment variables
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Injected by Cloud Build for build-time ISR pre-fetching
ARG DIRECTUS_URL
ENV DIRECTUS_URL=$DIRECTUS_URL

# Injected by Cloud Build for build-time evaluation
ARG DIRECTUS_STATIC_TOKEN
ENV DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN

ARG REVALIDATION_SECRET
ENV REVALIDATION_SECRET=$REVALIDATION_SECRET

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Ensure runtime environment variables are preserved for force-dynamic Server Components
ARG DIRECTUS_URL
ENV DIRECTUS_URL=$DIRECTUS_URL
ARG DIRECTUS_STATIC_TOKEN
ENV DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
