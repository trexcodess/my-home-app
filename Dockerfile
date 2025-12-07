# Use the official lightweight Node.js image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# 1. Install pnpm
RUN npm install -g pnpm

# 2. Install ALL dependencies (including devDependencies like Vite/TypeScript)
# We need these to run the build script.
RUN pnpm install

# Copy local code to the container image.
COPY . ./

# 3. Build the React/Vite application
# This generates the 'dist' folder with your static HTML/JS/CSS
RUN pnpm run build

# 4. (Optional) Prune dev dependencies to keep image small
# RUN pnpm prune --prod

# Run the web service on container startup.
# IMPORTANT: This assumes your Express server entry point is named 'index.js'
CMD [ "node", "index.js" ]