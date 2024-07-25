# Use a node image to build the React app
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY myapp/package.json /app/
COPY myapp/package-lock.json /app/ 
# if using npm 5+

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY myapp /app/

# Build the application
RUN npm run build

# Use a nginx image to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
