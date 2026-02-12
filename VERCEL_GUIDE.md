
# Vercel Deployment Guide

Deploying to Vercel is simple, but because we switched from SQLite (a local file) to PostgreSQL (a cloud database), there are a few extra steps.

## Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository (e.g., `chloewebsite`).
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chloewebsite.git
   git push -u origin main
   ```

## Step 2: Create Vercel Project & Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `chloewebsite` repository.
4. **Before clicking Deploy**:
   - On the "Configure Project" screen, look for **"Storage"** or **"Database"** (sometimes you do this after creating the project, but Vercel often suggests it).
   - If not visible, just click **Deploy** first (it might fail, that's okay).

## Step 3: Add Postgres Database (If you didn't in Step 2)
1. In your Vercel Project Dashboard, go to the **Storage** tab.
2. Click **"Connect Store"** -> **"Postgres"**.
3. Accept the terms and create the database (choose a region close to your users, e.g., Washington D.C. or San Francisco).
4. Once created, go to the **".env.local"** tab in the database view.
5. Click **"Show Secret"** and **"Copy Snippet"**.
6. Go to your Project **Settings** -> **Environment Variables**.
7. Vercel usually adds these automatically (`POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, etc.). **Check if they are there.**

## Step 4: Add Other Environment Variables
You need to manually add these environment variables in Vercel Settings:

| Name | Value |
|------|-------|
| `NEXTAUTH_SECRET` | Generate a random string (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your Vercel URL (e.g. `https://chloewebsite.vercel.app`) |
| `RESEND_API_KEY` | Your Resend API Key (starts with `re_`) |

## Step 5: Redeploy
1. Go to the **Deployments** tab.
2. Click the three dots on the latest deployment -> **"Redeploy"**.
3. Vercel will now:
   - Install dependencies.
   - Run `prisma generate` (thanks to the `postinstall` script we added).
   - Build your site.

## Step 6: Initialize the Database
Once deployed, your database is empty. You need to push the schema:
1. In Vercel, go to the **Storage** tab -> **Postgres**.
2. Click **"Query"** or access the database via CLI.
3. The easiest way is to run this from your **local machine** (if you have the credentials in your local `.env`):
   ```bash
   # Update your local .env with the Vercel Postgres credentials first!
   npx prisma db push
   ```
4. Or, you can add a "Build Command" in Vercel settings: `npx prisma db push && next build`.

## Troubleshooting
- **Local Development**: To run `npm run dev` locally now, you MUST update your local `.env` file with the `POSTGRES_PRISMA_URL` from Vercel. SQLite will no longer work because we changed the schema.
