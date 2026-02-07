# Naksh Jewels Backend API

Backend API for the Naksh Jewels E-Commerce Platform.

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

## Installation

```bash
npm install
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update `MONGODB_URI` with your MongoDB connection string

```bash
cp .env.example .env
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Seeding the Database

To populate the database with sample jewelry products:

```bash
npm run seed
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

### Cart
- `POST /api/cart` - Add item to cart (creates cart if doesn't exist)
- `GET /api/cart/:cartId` - Get cart contents
- `PUT /api/cart/:cartId/items/:productId` - Update item quantity
- `DELETE /api/cart/:cartId/items/:productId` - Remove item from cart
- `DELETE /api/cart/:cartId` - Clear entire cart

See [CART_API.md](./CART_API.md) for detailed cart API documentation.

## Response Format

All API responses follow this structure:

```json
{
  "success": true|false,
  "data": any,
  "message": "string",
  "error": null|string
}
```

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Testing Endpoints

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/<product_id>

# Health check
curl http://localhost:5000/health
```
