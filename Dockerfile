FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your server.js listens on (adjust if different)
EXPOSE 5050

# Start the application
CMD ["node", "server.js"]
