# Setup Guide - Fix Login & Registration Issues

## Critical Issues Found

1. ✅ **Frontend API endpoint fixed** - Now calls backend correctly
2. ✅ **NEXTAUTH_SECRET added to auth config**
3. ⚠️ **Prisma client needs generation**
4. ⚠️ **Environment variables need setup**
5. ⚠️ **Database needs initialization**

---

## Step-by-Step Setup Instructions

### 1. Generate Prisma Client

```bash
cd apps/backend
npx prisma generate
```

This will create the `@prisma/client` package and fix the TypeScript error.

---

### 2. Setup Environment Variables

#### Backend Environment (`apps/backend/.env`)

Create `apps/backend/.env` file:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/payment_app"

# NextAuth - Generate a secure secret
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-generated-secret-here"

# Google OAuth (Optional - leave as is if not using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT Secret
JWT_SECRET="your-jwt-secret-here"

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# Environment
NODE_ENV="development"
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this twice to get two different secrets for `NEXTAUTH_SECRET` and `JWT_SECRET`.

#### Frontend Environment (`apps/frontend/.env.local`)

Create `apps/frontend/.env.local` file:

```env
# NextAuth - Must match backend
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="same-secret-as-backend"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

**Important:** Use the **same** `NEXTAUTH_SECRET` in both files!

---

### 3. Setup PostgreSQL Database

Make sure PostgreSQL is running and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE payment_app;

# Exit
\q
```

Update the `DATABASE_URL` in `apps/backend/.env` with your actual PostgreSQL password.

---

### 4. Initialize Database Schema

```bash
cd apps/backend

# Push schema to database (creates tables)
npx prisma db push

# (Optional) Seed with sample data
npm run db:seed
```

---

### 5. Install Dependencies (if needed)

```bash
# From root directory
npm install

# Or from each app
cd apps/backend && npm install
cd apps/frontend && npm install
```

---

### 6. Start the Applications

Open **two separate terminals**:

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm run dev
```
Backend will run on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm run dev
```
Frontend will run on: http://localhost:3000

---

## Testing Login & Registration

### Test Registration:

1. Go to: http://localhost:3000/auth/signup
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Account Type: Personal (CLIENT)
3. Click "Create account"

### Test Login:

1. Go to: http://localhost:3000/auth/signin
2. Use the credentials you just created
3. Click "Sign in"

---

## Common Issues & Solutions

### Issue: "Module '@prisma/client' has no exported member 'PrismaClient'"
**Solution:** Run `npx prisma generate` in `apps/backend`

### Issue: "Can't reach database server"
**Solution:** 
- Make sure PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Verify PostgreSQL credentials

### Issue: "Invalid credentials" when logging in
**Solution:**
- Make sure you registered the account first
- Check backend terminal for error logs
- Verify database has the user record: `npx prisma studio`

### Issue: Registration returns 500 error
**Solution:**
- Check backend terminal for detailed error
- Make sure database tables exist: `npx prisma db push`
- Verify `NEXTAUTH_SECRET` is set in backend `.env`

### Issue: "Too many registration attempts"
**Solution:** Rate limiter triggered. Wait 15 minutes or restart backend server.

---

## Verify Setup

### Check Prisma Client:
```bash
cd apps/backend
npx prisma studio
```
This opens a GUI to view your database.

### Check Backend API:
Visit: http://localhost:3001/api/auth/signin
Should show NextAuth signin page.

### Check Environment Variables:
```bash
# Backend
cd apps/backend
node -e "console.log(process.env.DATABASE_URL ? 'DB URL set' : 'DB URL missing')"

# Frontend
cd apps/frontend
node -e "console.log(process.env.NEXT_PUBLIC_API_URL || 'API URL not set')"
```

---

## Architecture Overview

```
Frontend (Port 3000)
    ↓
    Calls API → Backend (Port 3001)
                    ↓
                NextAuth.js (Authentication)
                    ↓
                Prisma ORM
                    ↓
                PostgreSQL Database
```

- **Frontend:** Next.js app with auth pages
- **Backend:** Next.js API routes with NextAuth
- **Database:** PostgreSQL with Prisma ORM

---

## Next Steps After Setup

1. ✅ Test user registration
2. ✅ Test user login
3. ✅ Test wallet balance display
4. ✅ Test P2P transfers
5. ✅ Test merchant payments

---

## Need Help?

Check the logs:
- **Backend logs:** Terminal running `apps/backend`
- **Frontend logs:** Browser console (F12)
- **Database:** `npx prisma studio` in `apps/backend`
