#!/bin/sh

# Install dependencies
echo "Installing dependencies"
npm install

# Run migrations
echo "Running migrations"
npx drizzle-kit up

# Start the Next.JS application
echo "Starting Next.JS application"
npm run dev
