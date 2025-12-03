# Stage 1: Build the React application
FROM node:18-alpine AS builder  # <-- Name this stage 'builder'
WORKDIR /app
COPY package.json pnpm-lock.yaml ./ # Copy package.json and pnpm-lock.yaml
RUN pnpm install                   # Install dependencies using pnpm
COPY . .                           # Copy the rest of your application code
RUN pnpm run build                 # This command generates your /dist folder

# Stage 2: Serve the application with a lightweight server (e.g., 'serve' or Nginx)
FROM node:18-alpine                # Or a smaller image like 'alpine', if 'serve' is installed
                                   # or 'nginx:stable-alpine' if using Nginx
RUN npm install -g serve           # Install 'serve' globally if you want to use it
WORKDIR /app
COPY --from=builder /app/dist ./dist # <-- **CHANGED: Copy from 'builder' stage, '/app/dist' to './dist'**

EXPOSE 3000                        # Or whatever port 'serve' uses (default 3000)
CMD ["serve", "-s", "dist", "-l", "3000"] # Command to start your application

