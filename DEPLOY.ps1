# ============================================
#  Eid Baibalaa - One-Click Deploy to Vercel
# ============================================
#  Right-click this file > "Run with PowerShell"
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EID BAIBALAA - Deploy to Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Move to script directory
Set-Location $PSScriptRoot

# Step 1: Check Node.js
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    Write-Host "  Found Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  Node.js not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Please install Node.js first:" -ForegroundColor White
    Write-Host "  https://nodejs.org (download the LTS version)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  After installing, close this window and run this script again." -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Step 2: Install dependencies
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow
npm install 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  npm install failed. Retrying..." -ForegroundColor Red
    npm install
}
Write-Host "  Dependencies installed" -ForegroundColor Green

# Step 3: Install Vercel CLI
Write-Host "[3/5] Checking Vercel CLI..." -ForegroundColor Yellow
$vercelCheck = npm list -g vercel 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Installing Vercel CLI (first time only)..." -ForegroundColor White
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Failed to install Vercel CLI" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}
Write-Host "  Vercel CLI ready" -ForegroundColor Green

# Step 4: Build
Write-Host "[4/5] Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "  Build complete" -ForegroundColor Green

# Step 5: Deploy
Write-Host "[5/5] Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  If this is your first time, Vercel will open your browser" -ForegroundColor White
Write-Host "  to create an account. Sign up, then come back here." -ForegroundColor White
Write-Host ""
Write-Host "  When it asks questions, just press ENTER for all defaults." -ForegroundColor Cyan
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DONE! Your bracket is live!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  To redeploy after changes, run this script again." -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to close"
