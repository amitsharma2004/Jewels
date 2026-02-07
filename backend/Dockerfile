# Stage 1: Base image with dependencies
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
# This layer is cached unless package.json changes
COPY package*.json ./

# Stage 2: Development dependencies
FROM base AS development

# Install all dependencies (including devDependencies)
RUN npm install

# Copy application source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Run as non-root user for security
USER node

# Start development server with nodemon
CMD ["npm", "run", "dev"]

# Stage 3: Production dependencies
FROM base AS production-deps

# Install only production dependencies
RUN npm install --only=production && \
    npm cache clean --force

# Stage 4: Production build
FROM node:18-alpine AS production

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy production dependencies from production-deps stage
COPY --from=production-deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port 5000
EXPOSE 5000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start production server
CMD ["node", "server.js"]

# Labels for metadata
LABEL maintainer="Naksh Jewels"
LABEL description="Backend API for Naksh Jewels E-Commerce Platform"
LABEL version="1.0.0"
