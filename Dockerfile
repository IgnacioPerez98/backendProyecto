# Use the official Node.js image as the base image
FROM node:18s

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Express.js app will listen on
EXPOSE 3000

# Start the Express.js application
CMD ["npm", "start"]
