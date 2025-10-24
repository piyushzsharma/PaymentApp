#!/usr/bin/env pwsh
# TypeScript Cleanup Script
# This script removes all TypeScript files after conversion to JavaScript

Write-Host "🧹 Starting TypeScript cleanup..." -ForegroundColor Cyan
Write-Host ""

# Backend TypeScript files
Write-Host "📦 Cleaning backend TypeScript files..." -ForegroundColor Yellow
$backendFiles = @(
    "apps/backend/src/lib/db.ts",
    "apps/backend/src/lib/auth.ts",
    "apps/backend/src/lib/rate-limit.ts",
    "apps/backend/src/app/api/auth/[...nextauth]/route.ts",
    "apps/backend/src/app/api/auth/login/route.ts",
    "apps/backend/src/app/api/auth/register/route.ts",
    "apps/backend/src/app/api/transactions/route.ts",
    "apps/backend/src/app/api/users/route.ts",
    "apps/backend/src/app/api/wallet/balance/route.ts",
    "apps/backend/src/app/api/wallet/transfer/route.ts",
    "apps/backend/prisma/seed.ts",
    "apps/backend/tsconfig.json",
    "apps/backend/next-env.d.ts"
)

foreach ($file in $backendFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⊘ Not found: $file" -ForegroundColor Gray
    }
}

Write-Host ""

# Frontend TypeScript files
Write-Host "📦 Cleaning frontend TypeScript files..." -ForegroundColor Yellow
$frontendFiles = @(
    "apps/frontend/src/lib/api.ts",
    "apps/frontend/src/lib/auth.ts",
    "apps/frontend/src/lib/utils.ts",
    "apps/frontend/src/types/index.ts",
    "apps/frontend/src/components/Providers.tsx",
    "apps/frontend/src/components/ui/Button.tsx",
    "apps/frontend/src/components/ui/Input.tsx",
    "apps/frontend/src/components/ui/Card.tsx",
    "apps/frontend/src/components/auth/ProtectedRoute.tsx",
    "apps/frontend/src/components/layout/Header.tsx",
    "apps/frontend/src/components/dashboard/WalletBalance.tsx",
    "apps/frontend/src/components/dashboard/TransferForm.tsx",
    "apps/frontend/src/components/dashboard/TransactionHistory.tsx",
    "apps/frontend/src/app/layout.tsx",
    "apps/frontend/src/app/page.tsx",
    "apps/frontend/src/app/auth/signin/page.tsx",
    "apps/frontend/src/app/auth/signup/page.tsx",
    "apps/frontend/src/app/dashboard/page.tsx",
    "apps/frontend/src/app/dashboard/transfer/page.tsx",
    "apps/frontend/src/app/dashboard/history/page.tsx",
    "apps/frontend/src/app/merchant/page.tsx",
    "apps/frontend/tsconfig.json",
    "apps/frontend/next-env.d.ts"
)

foreach ($file in $frontendFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⊘ Not found: $file" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✅ TypeScript cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm install" -ForegroundColor White
Write-Host "  2. Run: cd apps/backend && npm run db:generate" -ForegroundColor White
Write-Host "  3. Run: npm run dev" -ForegroundColor White
Write-Host ""
