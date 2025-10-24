# PaymentApp - Production-Ready Web Payment Application

A complete full-stack payment application built with Next.js, featuring peer-to-peer transfers, merchant payments, and secure authentication.

## 🚀 Features

### Core Functionality

- **User Authentication**: Email/password and Google OAuth with NextAuth.js
- **User Roles**: Distinct CLIENT and MERCHANT account types
- **Wallet System**: Digital wallet with real-time balance tracking
- **P2P Transfers**: Send money between users instantly
- **Merchant Payments**: Accept payments from customers
- **Transaction History**: Complete audit trail of all transactions
- **Rate Limiting**: Built-in security against abuse
- **Responsive UI**: Modern, mobile-first design with Tailwind CSS

### Security Features

- JWT-based session management
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation with Zod
- SQL injection protection with Prisma
- CORS configuration
- Environment variable protection

## 🏗️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication solution
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - Type safety
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **bcryptjs** - Password hashing
- **rate-limiter-flexible** - Rate limiting

### DevOps & Tooling

- **TurboRepo** - Monorepo management
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
payment-app/
├── apps/
│   ├── frontend/          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/       # App Router pages
│   │   │   ├── components/ # Reusable UI components
│   │   │   ├── lib/       # Utility functions
│   │   │   └── types/     # TypeScript definitions
│   │   └── public/        # Static assets
│   └── backend/           # Next.js backend API
│       ├── src/
│       │   ├── app/api/   # API route handlers
│       │   ├── lib/       # Server utilities
│       │   └── middleware/ # Custom middleware
│       └── prisma/        # Database schema & migrations
├── packages/
│   └── shared/            # Shared utilities (future use)
├── package.json           # Root package.json
└── turbo.json            # TurboRepo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### 1. Clone and Install

```bash
git clone <repository-url>
cd payment-app
npm install
```

### 2. Environment Setup

#### Backend Environment (.env)

```bash
cd apps/backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/payment_app"
NEXTAUTH_SECRET="your-secure-secret-key"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
JWT_SECRET="your-jwt-secret"
```

#### Frontend Environment (.env.local)

```bash
cd apps/frontend
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-secret-key"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📊 Sample Data

The seed script creates test accounts:

| Email             | Password    | Role     | Starting Balance |
| ----------------- | ----------- | -------- | ---------------- |
| john@example.com  | password123 | CLIENT   | $1,500.00        |
| jane@example.com  | password123 | CLIENT   | $2,000.00        |
| store@example.com | password123 | MERCHANT | $5,000.00        |
| cafe@example.com  | password123 | MERCHANT | $3,000.00        |

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login (handled by NextAuth)

### Wallet Management

- `GET /api/wallet/balance` - Get current balance
- `POST /api/wallet/transfer` - Send money

### Transactions

- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/[id]` - Get specific transaction

### Users

- `GET /api/users` - Search users (for transfers)

## 🛡️ Security Features

### Rate Limiting

- General API: 100 requests per 15 minutes
- Authentication: 5 attempts per 15 minutes
- Automatic IP-based blocking

### Data Protection

- Password hashing with bcrypt (12 rounds)
- JWT tokens for session management
- Input validation on all endpoints
- SQL injection protection via Prisma
- XSS protection with proper sanitization

### Environment Security

- Sensitive data in environment variables
- Separate configurations for dev/prod
- No hardcoded secrets in codebase

## 🎨 UI Components

### Design System

- Consistent color palette with CSS variables
- Responsive breakpoints (mobile-first)
- Accessible form controls
- Loading states and error handling
- Toast notifications for user feedback

### Key Components

- `Button` - Versatile button component with variants
- `Input` - Form input with validation display
- `Card` - Content container with consistent styling
- `WalletBalance` - Real-time balance display
- `TransferForm` - Money transfer interface
- `TransactionHistory` - Paginated transaction list

## 📱 User Flows

### Client User Journey

1. **Registration/Login** → Choose CLIENT role
2. **Dashboard** → View balance and recent transactions
3. **Send Money** → P2P transfer or merchant payment
4. **History** → View all past transactions

### Merchant User Journey

1. **Registration/Login** → Choose MERCHANT role
2. **Merchant Dashboard** → Business overview
3. **Receive Payments** → Share email for customer payments
4. **Track Sales** → Monitor incoming payments

## 🚀 Production Deployment

### Environment Variables

Ensure all production environment variables are set:

- Database connection string
- NextAuth secret (generate new for production)
- Google OAuth credentials (production domains)
- Rate limiting configuration

### Database Migration

```bash
# Generate and apply migrations
npx prisma migrate deploy
```

### Build and Start

```bash
# Build all applications
npm run build

# Start production servers
npm run start
```

### Recommended Infrastructure

- **Database**: PostgreSQL on AWS RDS or similar
- **Hosting**: Vercel, Netlify, or AWS
- **CDN**: Cloudflare for static assets
- **Monitoring**: Application performance monitoring
- **Backup**: Automated database backups

## 🔍 Troubleshooting

### Common Issues

**Database Connection Issues**

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Authentication Problems**

- Verify NEXTAUTH_SECRET is set
- Check Google OAuth configuration
- Confirm callback URLs match

**API Rate Limiting**

- Check rate limit configuration
- Clear rate limit cache if needed
- Verify IP detection is working
