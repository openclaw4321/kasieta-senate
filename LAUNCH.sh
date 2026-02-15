#!/bin/bash

# Kasieta for Senate - Quick Launch Script
# Run this to preview the website locally

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  JUSTIN KASIETA FOR U.S. SENATE - WEBSITE LAUNCHER"
echo "  From Foster Care to the Fight for Michigan"
echo "═══════════════════════════════════════════════════════"
echo ""

cd "$(dirname "$0")"

# Check which server is available and run it
if command -v python3 &> /dev/null; then
    echo "🚀 Starting Python development server..."
    echo "📍 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v php &> /dev/null; then
    echo "🚀 Starting PHP development server..."
    echo "📍 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
elif command -v npx &> /dev/null; then
    echo "🚀 Starting Node.js development server..."
    echo "📍 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p 8000
else
    echo "❌ No suitable web server found."
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3: https://www.python.org/downloads/"
    echo "  • PHP: https://www.php.net/downloads"
    echo "  • Node.js: https://nodejs.org/"
    echo ""
    echo "Or simply open index.html in your browser."
    echo ""
    exit 1
fi
