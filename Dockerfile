# Stage 1: Build the Vite application
FROM node:18-alpine AS builder 

# Set the working directory for all subsequent commands in this stage
WORKDIR /app

# Copy package.json and lockfile first for efficient Docker layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Run the build command. For Vite, this generates the 'dist' folder.
RUN pnpm run build 

# Stage 2: Serve the application using the 'serve' package
FROM node:18-alpine 
WORKDIR /app 

# Install the static file server globally
RUN npm install -g serve 

# Copy only the built output from the 'builder' stage
# FIX: Using /app/dist as confirmed for Vite projects.
# We copy the contents of /app/dist from Stage 1 into the current stage's /app/dist folder.
COPY --from=builder /app/dist ./dist

# Expose the port where the service will listen.
EXPOSE 8080

# Command to start your application using 'serve'.
# -s means serve static files, 'dist' is the folder to serve.
# -l specifies the listen address and port. Using $PORT is standard for Cloud Run.
CMD ["serve", "-s", "dist", "-l", "$PORT"]