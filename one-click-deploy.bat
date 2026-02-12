@echo off
echo ========================================================
echo               Chloe Website Deployment Script
echo ========================================================
echo.

echo Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is NOT installed.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo After installing, restart your computer and run this script again.
    pause
    exit /b
)

echo.
echo [1/6] Initializing Git repository...
git init

echo.
echo [2/6] Adding files...
git add .

echo.
echo [3/6] Committing changes...
git commit -m "Ready for deployment"

echo.
echo [4/6] Setting main branch...
git branch -M main

echo.
echo [5/6] Connecting to GitHub...
set /p REMOTE_URL="Please paste your GitHub URL (e.g., https://github.com/user/repo.git): "
git remote add origin %REMOTE_URL%

echo.
echo [6/6] Pushing to GitHub...
git push -u origin main

echo.
echo ========================================================
echo                   Deployment Complete!
echo ========================================================
echo Now go to Vercel.com and import your repository.
pause
