# Stage 1: Build the React application
FROM node:18-alpine AS builder 

WORKDIR /app

# Copy package.json and pnpm-lock.yaml first for efficient Docker layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install                  
COPY . .                          
RUN pnpm run build                

# Stage 2: Serve the application using the 'serve' package
FROM node:18-alpine               
WORKDIR /app                     
RUN npm install -g serve           

# Copy only the built output from the 'builder' stage
# The 'dist' folder generated in the first stage, located at /app/dist within that stage,
# is copied to the current working directory (/app) of this second stage.
COPY --from=builder /app/dist ./dist

# Expose the port where the 'serve' application will listen.
# Cloud Run typically expects services to listen on port 8080.
EXPOSE 8080

# Command to start your application using 'serve'.
# -s means serve static files, 'dist' is the folder to serve,
# -l specifies the listen address and port. We use 8080.
# Cloud Run will set the PORT environment variable, but explicitly setting it to 8080
# within the CMD is often safer if the runtime environment doesn't reliably set $PORT.
CMD ["serve", "-s", "dist", "-l", "8080"]
