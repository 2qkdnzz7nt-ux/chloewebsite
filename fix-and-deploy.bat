@echo off
echo ========================================================
echo               FIX & DEPLOY SCRIPT
echo ========================================================
echo.

echo [1/7] Configuring Git user (Avoiding 'Who are you' error)...
git config --global user.email "you@example.com"
git config --global user.name "Your Name"

echo.
echo [2/7] Initializing Git...
git init

echo.
echo [3/7] Adding all files...
git add .

echo.
echo [4/7] Committing changes...
git commit -m "Ready for deployment"

echo.
echo [5/7] Setting branch to 'main'...
git branch -M main

echo.
echo [6/7] Fixing Remote URL...
git remote remove origin 2>nul
git remote add origin https://github.com/2qkdnzz7nt-ux/chloewebsite.git

echo.
echo [7/7] Pushing to GitHub...
git push -u origin main

echo.
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Please check your internet or permissions.
) else (
    echo [SUCCESS] Code uploaded successfully!
    echo Now go to Vercel and import your project.
)
pause
