@echo off
echo ========================================================
echo               DIRECT VERCEL DEPLOY
echo ========================================================
echo.
echo This will upload your files directly to Vercel.
echo skipping GitHub to avoid network/sync issues.
echo.

echo [1/3] Installing Vercel CLI...
call npm install -g vercel

echo.
echo [2/3] Logging in (If asked, please login)...
call vercel login

echo.
echo [3/3] Deploying to Production...
echo --------------------------------------------------------
echo NOTE: When asked questions, just press ENTER for all of them!
echo --------------------------------------------------------
call vercel --prod

pause
