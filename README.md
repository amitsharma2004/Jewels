# Naksh Jewels E-Commerce Platform

A full-stack e-commerce application for jewelry, built with React, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls
- **CSS Modules** for styling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication (planned)
- **Helmet** for security
- **Morgan** for logging

### DevOps
- **Docker** with multi-stage builds
- **Nginx** for frontend serving
- **Docker Compose** for orchestration

## Project Structure

```
naksh-jewels-ecommerce/
├── frontend/           # React application
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/            # Node.js API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml  # Full stack orchestration
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- MongoDB (for local development)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd naksh-jewels-ecommerce

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### Local Development

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Features

### Implemented
- ✅ Product listing with responsive grid
- ✅ Shopping cart with Redux state management
- ✅ Add to cart functionality
- ✅ Cart quantity management
- ✅ Product search and filtering (backend ready)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading skeletons
- ✅ Error boundaries
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Docker containerization

### Planned
- 🔄 User authentication (JWT)
- 🔄 Checkout process
- 🔄 Order management
- 🔄 Payment integration
- 🔄 Product reviews
- 🔄 Wishlist
- 🔄 Admin dashboard

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart/:cartId` - Get cart contents
- `PUT /api/cart/:cartId/items/:productId` - Update quantity
- `DELETE /api/cart/:cartId/items/:productId` - Remove item
- `DELETE /api/cart/:cartId` - Clear cart

### Health
- `GET /health` - Server health check

## Docker Images

### Backend
- **Base**: Node 18 Alpine
- **Size**: ~221MB
- **Features**: Multi-stage build, non-root user, health checks

### Frontend
- **Base**: Nginx Alpine
- **Size**: ~94MB
- **Features**: Multi-stage build, gzip compression, security headers

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/naksh-jewels
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

### Backend Scripts
```bash
npm start       # Production server
npm run dev     # Development with nodemon
npm run seed    # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

## Testing

### Manual Testing
```bash
# Test backend health
curl http://localhost:5000/health

# Test products endpoint
curl http://localhost:5000/api/products

# Test frontend
curl http://localhost/
```

### Docker Testing
```bash
# Build and test backend
cd backend
docker build -t naksh-backend:test .
docker run -p 5000:5000 naksh-backend:test

# Build and test frontend
cd frontend
docker build -t naksh-frontend:test .
docker run -p 80:80 naksh-frontend:test
```

## Deployment

### Production Build
```bash
# Build all services
docker-compose build

# Start in production mode
docker-compose up -d

# View logs
docker-compose logs -f

# Scale services (if needed)
docker-compose up -d --scale backend=3
```

### Cloud Deployment
See individual DOCKER.md files in backend and frontend directories for detailed deployment instructions.

## Documentation

- [Backend Docker Guide](./backend/DOCKER.md)
- [Frontend Docker Guide](./frontend/DOCKER.md)
- [Backend API Documentation](./backend/README.md)
- [Frontend Features](./frontend/FEATURES.md)
- [Accessibility Guide](./frontend/ACCESSIBILITY.md)
- [Responsive Design](./frontend/RESPONSIVE.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created for internship assessment purposes.

## Support

For issues and questions, please create an issue in the repository.
