@echo off
echo ========================================================
echo               PUSHING LATEST CHANGES
echo ========================================================
echo.

echo [1/3] Adding changes...
git add .

echo.
echo [2/3] Committing (Fix Prisma Schema)...
git commit -m "Fix: Change Prisma to use DATABASE_URL"

echo.
echo [3/3] Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo Please try running 'fix-network.bat' and choose Option 1 if you have a VPN.
) else (
    echo.
    echo [SUCCESS] Code updated on GitHub!
    echo Now Vercel will automatically redeploy (or you can redeploy manually).
)
pause
