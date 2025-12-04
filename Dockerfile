# --- STAGE 1: BUILD ---
FROM docker.io/node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally. This fixes the "pnpm: not found" error.
# We must do this before trying to use pnpm commands.
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN pnpm run build


# --- STAGE 2: SERVE (for Cloud Run) ---
FROM docker.io/nginx:alpine

# The default Nginx configuration listens on port 80.
# Cloud Run requires the container to listen on the port specified by the PORT environment variable (default 8080).
# We copy a custom configuration to fix this.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# The EXPOSE instruction is mostly documentation, but good practice.
EXPOSE 8080

# Command to run Nginx
# Nginx will use the port specified in the custom nginx.conf file.
CMD ["nginx", "-g", "daemon off;"]