#!/bin/sh
# Simple helper script to install Node.js dependencies for all subprojects

set -e

if [ -d "backend" ]; then
  echo "Installing backend dependencies..."
  (cd backend && npm install)
fi

if [ -d "frontend" ]; then
  echo "Installing frontend dependencies..."
  (cd frontend && npm install)
fi

echo "Installation complete."
