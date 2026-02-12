@echo off
echo ========================================================
echo               NETWORK FIX & DEPLOY
echo ========================================================
echo.
echo It looks like GitHub is blocked or timing out.
echo This is common if you are in a region where GitHub is restricted.
echo.

:MENU
echo Choose an option:
echo [1] I have a VPN/Proxy (e.g., Clash, v2ray) - Let's configure Git to use it.
echo [2] I do NOT have a VPN - Try to unset proxy (Fix configuration).
echo [3] Skip GitHub and deploy directly to Vercel (Requires Vercel account).
echo.
set /p choice="Enter number (1, 2, or 3): "

if "%choice%"=="1" goto PROXY
if "%choice%"=="2" goto UNSET
if "%choice%"=="3" goto VERCEL
goto MENU

:PROXY
echo.
echo Most proxies use port 7890 (Clash) or 1080.
set /p port="Enter your proxy port (Press Enter for default 7890): "
if "%port%"=="" set port=7890
echo.
echo Setting Git proxy to http://127.0.0.1:%port% ...
git config --global http.proxy http://127.0.0.1:%port%
git config --global https.proxy http://127.0.0.1:%port%
goto RETRY

:UNSET
echo.
echo Clearing any existing proxy settings...
git config --global --unset http.proxy
git config --global --unset https.proxy
goto RETRY

:RETRY
echo.
echo Retrying push to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo [FAIL] Still cannot connect. 
    echo Please try Option 3 (Vercel Direct Deployment).
    pause
    goto MENU
)
echo.
echo [SUCCESS] Connected and pushed to GitHub!
pause
exit

:VERCEL
echo.
echo Installing Vercel CLI...
call npm install -g vercel
echo.
echo Starting Vercel Deployment...
echo Follow the instructions on screen (Login -> Yes -> Yes -> Yes).
call vercel
pause
