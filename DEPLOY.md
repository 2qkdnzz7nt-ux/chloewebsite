
# Deployment Guide

Your website is ready for deployment! You have two main options:

## Option 1: Vercel (Recommended)
**Best for:** Speed, Free Tier, Performance (Edge Network).
**Constraint:** Requires switching from SQLite to PostgreSQL (Vercel Postgres or Neon).

### Steps:
1. **Push your code to GitHub**.
2. **Create a Database**:
   - Go to [Vercel](https://vercel.com) and create a new project.
   - Add "Storage" -> "Postgres" to your project.
   - This will give you a `POSTGRES_PRISMA_URL`.
3. **Update Code** (I can help with this):
   - We need to change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`.
   - Update `.env` locally to use the new connection string.
4. **Deploy**: Vercel handles the rest.

## Option 2: VPS / Docker (Keep SQLite)
**Best for:** Owning your data, keeping the current SQLite setup.
**Requirements:** A server (e.g., DigitalOcean, AWS) with Docker installed.

### Steps:
1. **Build the Docker Image**:
   ```bash
   docker build -t chloewebsite .
   ```
2. **Run the Container**:
   You need to mount a volume to persist your database.
   ```bash
   # Create a directory for data
   mkdir -p /opt/chloewebsite/data
   
   # Run the container
   docker run -d \
     -p 3000:3000 \
     -v /opt/chloewebsite/data:/app/prisma \
     -e DATABASE_URL="file:/app/prisma/dev.db" \
     -e NEXTAUTH_SECRET="your_secret_here" \
     -e NEXTAUTH_URL="http://your-domain.com" \
     -e RESEND_API_KEY="your_resend_key" \
     chloewebsite
   ```
3. **Initialize Database**:
   If it's a fresh install, you might need to run migrations inside the container:
   ```bash
   docker exec -it <container_id> npx prisma migrate deploy
   ```

## Pre-Deployment Checklist
- [x] **Build Check**: `npm run build` passes.
- [x] **Environment**: `Dockerfile` is ready.
- [x] **Email**: Resend API is configured.
- [ ] **Secret**: Generate a strong `NEXTAUTH_SECRET` for production.
