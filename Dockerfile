# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first to leverage caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code and build
COPY . .
RUN npm run build

# --- Stage 2: Create the Final Production Image (Node.js Server) ---
# Assuming you use a server like Express to serve the build output
FROM node:20-slim
WORKDIR /app

# Copy the production dependencies (required by the server)
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy the built React app from the build stage
COPY --from=build /app/build ./public 

# Copy your server-side entry point (e.g., server.js or index.js)
# You MUST have a file here that starts the Node.js server.
COPY server.js .

# Cloud Run injects the PORT environment variable.
# It typically listens on 8080.
ENV PORT 8080

EXPOSE 8080

# This is the command to run your Node.js server
CMD ["node", "server.js"]