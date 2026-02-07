# Naksh Jewels E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

A full-stack e-commerce application for jewelry, built with modern web technologies and best practices. This project demonstrates a complete MERN stack implementation with Docker containerization, responsive design, and production-ready features.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Implemented Features

#### Frontend
- ✅ **Product Listing**: Responsive grid layout with product cards
- ✅ **Shopping Cart**: Full cart management with Redux state
- ✅ **Add to Cart**: Real-time cart updates with success feedback
- ✅ **Quantity Management**: Increase/decrease quantities with stock validation
- ✅ **Responsive Design**: Mobile-first design (mobile, tablet, desktop)
- ✅ **Loading States**: Elegant skeleton loaders for better UX
- ✅ **Error Handling**: Error boundaries and user-friendly error messages
- ✅ **Accessibility**: WCAG 2.1 AA compliant with ARIA labels
- ✅ **Navigation**: Sticky navbar with cart badge showing item count
- ✅ **Empty States**: Graceful handling of empty cart and product lists

#### Backend
- ✅ **RESTful API**: Clean API design with proper HTTP methods
- ✅ **Product Management**: CRUD operations for products
- ✅ **Cart Operations**: Add, update, remove items with validation
- ✅ **Stock Validation**: Prevents over-ordering
- ✅ **Error Handling**: Consistent error responses
- ✅ **Data Validation**: Input validation middleware
- ✅ **MongoDB Integration**: Mongoose ODM with schemas
- ✅ **Health Checks**: Monitoring endpoints
- ✅ **Security**: Helmet, CORS, input sanitization

#### DevOps
- ✅ **Docker Support**: Multi-stage builds for both frontend and backend
- ✅ **Docker Compose**: Full stack orchestration
- ✅ **Production Ready**: Optimized images with health checks
- ✅ **Non-root Users**: Security best practices
- ✅ **Nginx Configuration**: Gzip, caching, security headers

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS Modules** - Component-scoped styling

### Backend
- **Node.js 18** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend
- **Git** - Version control

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
│                    (React SPA on Port 80)                    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Nginx (Alpine)                          │
│              Serves static files + SPA routing               │
│           Gzip compression + Security headers                │
└────────────────────────┬────────────────────────────────────┘
                         │ API Calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express API (Port 5000)                    │
│                  Node.js + Express + Helmet                  │
│              Routes → Controllers → Services                 │
└────────────────────────┬────────────────────────────────────┘
                         │ Mongoose ODM
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB (Port 27017)                       │
│              Collections: products, carts                    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → React Component → Redux Action → API Call (Axios)
                                                      ↓
                                              Express Route
                                                      ↓
                                              Controller
                                                      ↓
                                              Mongoose Model
                                                      ↓
                                              MongoDB
                                                      ↓
                                              Response ← Redux State Update ← Component Re-render
```

## 📦 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 10.x or higher
- **MongoDB**: 7.x or higher (or MongoDB Atlas account)
- **Docker**: 20.x or higher (optional, for containerized deployment)
- **Docker Compose**: 2.x or higher (optional)
- **Git**: For version control

## 🚀 Installation

### Clone the Repository

```bash
git clone <repository-url>
cd naksh-jewels-ecommerce
```

## 💻 Development Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/naksh-jewels
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start development server:
```bash
npm run dev
```

Backend will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start development server:
```bash
npm run dev
```

Frontend will be running at `http://localhost:3000`

## 🐳 Docker Setup

### Quick Start (Recommended)

Start the entire stack with one command:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 80

Access the application at `http://localhost`

### Individual Services

#### Backend Only

```bash
cd backend
docker build -t naksh-backend .
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/naksh-jewels \
  naksh-backend
```

#### Frontend Only

```bash
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:5000/api -t naksh-frontend .
docker run -p 80:80 naksh-frontend
```

### Production Deployment

```bash
# Build production images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Seed Database in Docker

```bash
# Access backend container
docker exec -it naksh-backend sh

# Run seed script
npm run seed
```

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Health Check

#### GET /health

Check server health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-08T00:00:00.000Z"
}
```

### Products

#### GET /api/products

Get all products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Royal Diamond Ring",
      "description": "Elegant 18K gold ring with premium diamond setting",
      "price": 125000,
      "category": "rings",
      "material": "diamond",
      "weight": 5.2,
      "stock": 15,
      "images": ["https://example.com/image1.jpg"],
      "inStock": true,
      "createdAt": "2026-02-08T00:00:00.000Z",
      "updatedAt": "2026-02-08T00:00:00.000Z"
    }
  ],
  "message": "Found 8 products",
  "error": null
}
```

#### GET /api/products/:id

Get a single product by ID.

**Parameters:**
- `id` (string, required): Product ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Royal Diamond Ring",
    "price": 125000,
    ...
  },
  "message": "Product retrieved successfully",
  "error": null
}
```

**Error Response (404):**
```json
{
  "success": false,
  "data": null,
  "message": "Product not found",
  "error": "No product with ID: 507f1f77bcf86cd799439011"
}
```

### Cart

#### POST /api/cart

Add item to cart (creates cart if doesn't exist).

**Request Body:**
```json
{
  "cartId": "507f1f77bcf86cd799439012",  // Optional, omit to create new cart
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "guest",
    "items": [
      {
        "productId": {...},
        "quantity": 2,
        "priceAtAdd": 125000
      }
    ],
    "totalAmount": 250000,
    "createdAt": "2026-02-08T00:00:00.000Z",
    "updatedAt": "2026-02-08T00:00:00.000Z"
  },
  "message": "Item added to cart successfully",
  "error": null
}
```

#### GET /api/cart/:cartId

Get cart contents.

**Parameters:**
- `cartId` (string, required): Cart ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "items": [...],
    "totalAmount": 250000
  },
  "message": "Cart retrieved successfully",
  "error": null
}
```

#### PUT /api/cart/:cartId/items/:productId

Update item quantity in cart.

**Parameters:**
- `cartId` (string, required): Cart ID
- `productId` (string, required): Product ID

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "items": [...],
    "totalAmount": 375000
  },
  "message": "Cart updated successfully",
  "error": null
}
```

#### DELETE /api/cart/:cartId/items/:productId

Remove item from cart.

**Parameters:**
- `cartId` (string, required): Cart ID
- `productId` (string, required): Product ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "items": [],
    "totalAmount": 0
  },
  "message": "Item removed from cart successfully",
  "error": null
}
```

#### DELETE /api/cart/:cartId

Clear entire cart.

**Parameters:**
- `cartId` (string, required): Cart ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "items": [],
    "totalAmount": 0
  },
  "message": "Cart cleared successfully",
  "error": null
}
```

### Error Responses

All endpoints follow a consistent error format:

```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## 📁 Project Structure

```
naksh-jewels-ecommerce/
├── backend/                    # Node.js/Express backend
│   ├── config/                 # Configuration files
│   │   └── db.js              # MongoDB connection
│   ├── controllers/            # Business logic
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── data/                   # Seed data
│   │   └── seedData.js
│   ├── middleware/             # Custom middleware
│   │   ├── errorHandler.js
│   │   ├── validateId.js
│   │   └── validation.js
│   ├── models/                 # Mongoose schemas
│   │   ├── Cart.js
│   │   └── Product.js
│   ├── routes/                 # API routes
│   │   ├── cart.js
│   │   └── products.js
│   ├── scripts/                # Utility scripts
│   │   └── seed.js
│   ├── utils/                  # Helper functions
│   │   └── responseHelper.js
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── server.js              # Entry point
│   └── README.md
├── frontend/                   # React frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── CartItem.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Skeletons/
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Route components
│   │   │   ├── CartPage.jsx
│   │   │   ├── Home.jsx
│   │   │   └── ProductListingPage.jsx
│   │   ├── services/           # API services
│   │   │   ├── api.js
│   │   │   ├── cartService.js
│   │   │   └── productService.js
│   │   ├── store/              # Redux store
│   │   │   ├── index.js
│   │   │   └── slices/
│   │   │       ├── cartSlice.js
│   │   │       └── productSlice.js
│   │   ├── styles/             # Global styles
│   │   │   └── global.css
│   │   ├── utils/              # Utility functions
│   │   │   └── formatters.js
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── docker/                     # Docker configurations
├── .gitignore
├── docker-compose.yml          # Full stack orchestration
├── LICENSE
└── README.md                   # This file
```

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/naksh-jewels

# JWT Configuration (for future use)
# JWT_SECRET=your_jwt_secret_key
# JWT_EXPIRE=7d

# CORS Configuration (for future use)
# CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Manual Testing

#### Backend API

```bash
# Health check
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/<product_id>

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"<product_id>","quantity":1}'
```

#### Frontend

1. Open browser to `http://localhost:3000`
2. Navigate to Products page
3. Add items to cart
4. View cart and update quantities
5. Test responsive design (resize browser)
6. Test keyboard navigation
7. Test with screen reader

### Docker Testing

```bash
# Test backend build
cd backend
docker build -t naksh-backend:test .

# Test frontend build
cd frontend
docker build -t naksh-frontend:test .

# Test full stack
docker-compose up
```

## 🚢 Deployment

### Production Checklist

- [ ] Update environment variables for production
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Review security headers
- [ ] Test all endpoints
- [ ] Load testing

### Docker Deployment

```bash
# Build production images
docker-compose build

# Start services
docker-compose up -d

# Check health
docker ps
docker-compose logs -f

# Scale backend if needed
docker-compose up -d --scale backend=3
```

### Cloud Deployment

See individual DOCKER.md files for platform-specific deployment instructions:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check MongoDB URI in `.env`
3. For Docker: Use `mongodb://mongo:27017` instead of `localhost`

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or use different port
```

#### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Ensure backend CORS is configured
2. Check `VITE_API_URL` in frontend `.env`
3. Verify backend is running

#### Docker Build Fails

**Problem:** `npm ci` fails or dependencies not found

**Solution:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` to regenerate lock file
3. Rebuild Docker image

#### Frontend Shows Blank Page

**Problem:** White screen or no content

**Solution:**
1. Check browser console for errors
2. Verify API URL is correct
3. Ensure backend is running
4. Check network tab for failed requests

### Getting Help

1. Check existing documentation
2. Review error messages carefully
3. Search GitHub issues
4. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Screenshots if applicable

## 📸 Screenshots

> **Note:** Add screenshots here after deployment

### Home Page
![Home Page](./screenshots/home.png)

### Product Listing
![Product Listing](./screenshots/products.png)

### Shopping Cart
![Shopping Cart](./screenshots/cart.png)

### Mobile View
![Mobile View](./screenshots/mobile.png)

## 🎥 Demo Video

> **Note:** Add demo video link here

[Watch Demo Video](https://your-video-link.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Naksh Jewels Development Team**

This project was created as part of an internship assessment to demonstrate full-stack development skills.

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js community
- MongoDB team
- Docker community
- All open-source contributors

## 📞 Support

For questions or issues, please:
1. Check the documentation
2. Review troubleshooting section
3. Create an issue on GitHub

---

**Built with ❤️ for Naksh Jewels Internship Assessment**
