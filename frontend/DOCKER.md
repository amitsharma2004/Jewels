# Frontend Docker Setup Guide

## Overview

The frontend is containerized using a multi-stage Docker build with Nginx for optimal performance and minimal image size.

## Image Details

- **Build Stage**: Node 18 Alpine (~150MB during build)
- **Production Stage**: Nginx Alpine (~25MB final image)
- **Non-root User**: nginx-user (UID 1001)
- **Health Check**: Built-in HTTP health check on `/health`

## Build Instructions

### Production Build

```bash
# Build with default API URL
docker build -t naksh-frontend:prod .

# Build with custom API URL
docker build \
  --build-arg VITE_API_URL=https://api.example.com/api \
  -t naksh-frontend:prod .

# Run production container
docker run -p 80:80 naksh-frontend:prod
```

### Development Build

For development, it's recommended to run Vite directly on the host:

```bash
npm run dev
```

Or use docker-compose for development:

```bash
docker-compose up
```

## Docker Compose

### Production

```bash
# Build and start
docker-compose -f docker-compose.prod.yml up -d

# With custom API URL
VITE_API_URL=https://api.example.com/api \
  docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## Multi-Stage Build Explanation

### Stage 1: Build (Node 18 Alpine)
1. Installs dependencies
2. Copies source code
3. Runs `npm run build`
4. Outputs static files to `/app/dist`

### Stage 2: Production (Nginx Alpine)
1. Copies built files from build stage
2. Configures Nginx for SPA routing
3. Sets up non-root user
4. Enables gzip compression
5. Adds security headers

## Nginx Configuration

### SPA Routing
All routes fallback to `index.html` for client-side routing:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Gzip Compression
Enabled for text-based files to reduce bandwidth:
- HTML, CSS, JavaScript
- JSON, XML
- Fonts, SVG

### Security Headers
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy`

### Caching Strategy
Static assets cached for 1 year:
- JavaScript, CSS
- Images (PNG, JPG, SVG)
- Fonts (WOFF, TTF)

## Environment Variables

### Build-time Variables

Set during `docker build`:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com/api \
  -t naksh-frontend:prod .
```

### Available Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Health Check

The container includes a built-in health check:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
```

Check health status:
```bash
docker inspect --format='{{.State.Health.Status}}' naksh-frontend-prod
```

## Security Features

1. **Non-root User**: Runs as `nginx-user` (UID 1001)
2. **Minimal Image**: Nginx Alpine base (~25MB)
3. **Security Headers**: XSS, clickjacking, MIME-sniffing protection
4. **No Secrets**: All config in build args or environment
5. **Static Files Only**: No Node.js runtime in production

## Image Size Optimization

### Techniques Used
- Multi-stage build (removes build dependencies)
- Alpine Linux base (~5MB)
- Only copies built files (no source code)
- Nginx instead of Node.js for serving

### Size Comparison
- With Node.js: ~200MB
- With Nginx: ~25MB
- **Reduction**: 87.5%

## Testing

### Test Build Locally

```bash
# Build image
docker build -t naksh-frontend:test .

# Run container
docker run -d -p 8080:80 --name frontend-test naksh-frontend:test

# Test endpoints
curl http://localhost:8080/
curl http://localhost:8080/health
curl http://localhost:8080/products

# Check logs
docker logs frontend-test

# Stop and remove
docker stop frontend-test
docker rm frontend-test
```

### Test SPA Routing

```bash
# Direct URL access should work
curl http://localhost:8080/products
curl http://localhost:8080/cart

# Should return index.html (not 404)
```

## Production Deployment

### Build and Push to Registry

```bash
# Tag image
docker tag naksh-frontend:prod your-registry/naksh-frontend:1.0.0

# Push to registry
docker push your-registry/naksh-frontend:1.0.0
```

### Run in Production

```bash
# Pull and run
docker pull your-registry/naksh-frontend:1.0.0
docker run -d \
  --name naksh-frontend \
  -p 80:80 \
  --restart always \
  your-registry/naksh-frontend:1.0.0
```

### With Reverse Proxy

If using a reverse proxy (Nginx, Traefik, etc.):

```bash
# Run on different port
docker run -d \
  --name naksh-frontend \
  -p 3000:80 \
  your-registry/naksh-frontend:1.0.0
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs naksh-frontend-prod

# Check nginx config
docker exec naksh-frontend-prod nginx -t
```

### API calls failing
```bash
# Check API URL in built files
docker exec naksh-frontend-prod cat /usr/share/nginx/html/index.html | grep VITE_API_URL

# Rebuild with correct API URL
docker build --build-arg VITE_API_URL=https://api.example.com/api -t naksh-frontend:prod .
```

### 404 on direct URL access
```bash
# Verify nginx config
docker exec naksh-frontend-prod cat /etc/nginx/conf.d/default.conf

# Should have: try_files $uri $uri/ /index.html;
```

### Port already in use
```bash
# Use different port
docker run -p 8080:80 naksh-frontend:prod
```

## Monitoring

### View Logs
```bash
# Follow logs
docker logs -f naksh-frontend-prod

# Last 100 lines
docker logs --tail 100 naksh-frontend-prod
```

### Resource Usage
```bash
# Container stats
docker stats naksh-frontend-prod

# Detailed info
docker inspect naksh-frontend-prod
```

### Nginx Access Logs
```bash
# View access logs
docker exec naksh-frontend-prod tail -f /var/log/nginx/access.log

# View error logs
docker exec naksh-frontend-prod tail -f /var/log/nginx/error.log
```

## Cleanup

```bash
# Remove container
docker rm -f naksh-frontend-prod

# Remove image
docker rmi naksh-frontend:prod

# Remove all unused images
docker image prune -a

# Remove build cache
docker builder prune
```

## Full Stack Deployment

To deploy both frontend and backend together, see the root `docker-compose.yml` file.
