# Stage 1: Build the application
# Use a Node.js image with pnpm pre-installed
FROM docker.io/node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you use it) to leverage Docker cache
# This means pnpm install won't run again if dependencies haven't changed
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the application for production
# This will generate static assets in the 'dist' folder
RUN pnpm run build

# Stage 2: Serve the application with a lightweight web server
# Use a lean base image for the final production image
FROM docker.io/nginx:alpine

# Copy the built assets from the builder stage to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
