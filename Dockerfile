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

CMD ["npm", "run", "dev"]

