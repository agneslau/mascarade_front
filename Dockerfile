# Stage 1: Build the Vue.js application
FROM node:lts-alpine3.19 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Vue.js application
RUN npm run build

# Stage 2: Serve the Vue.js application with Nginx
FROM nginx:mainline-alpine3.19-perl

# Copy the built Vue.js application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx to serve the Vue.js application
CMD ["nginx", "-g", "daemon off;"]
