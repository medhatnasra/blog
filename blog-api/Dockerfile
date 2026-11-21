FROM node:22-alpine

WORKDIR /app

# Copy dependency files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of your backend code
COPY . .

# Your Express server runs on port 4000
EXPOSE 4000

# Start the server directly with Node (not nodemon)
CMD ["node", "index.js"]
