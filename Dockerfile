# Use the official lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to cache dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your server listens on (e.g., 3000)
EXPOSE 8082

# Command to start your Node.js server
CMD ["node", "server.js"]