# Naksh Jewels Backend API Documentation

Complete API reference for the Naksh Jewels E-Commerce Platform backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any | null,
  "message": string,
  "error": string | null
}
```

## Authentication

Currently, the API does not require authentication. All endpoints are public.

**Future Implementation:** JWT-based authentication will be added for user-specific operations.

## Endpoints

### Health Check

#### GET /health

Check if the server is running and healthy.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-08T00:00:00.000Z"
}
```

---

### Products

#### GET /api/products

Retrieve all products from the database.

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Royal Diamond Ring",
      "description": "Elegant 18K gold ring with premium diamond setting, perfect for engagements",
      "price": 125000,
      "category": "rings",
      "material": "diamond",
      "weight": 5.2,
      "stock": 15,
      "images": [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
      ],
      "inStock": true,
      "createdAt": "2026-02-08T00:00:00.000Z",
      "updatedAt": "2026-02-08T00:00:00.000Z"
    }
  ],
  "message": "Found 8 products",
  "error": null
}
```

**Response (200 OK - Empty):**
```json
{
  "success": true,
  "data": [],
  "message": "No products found",
  "error": null
}
```

#### GET /api/products/:id

Retrieve a single product by its ID.

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the product

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Royal Diamond Ring",
    "description": "Elegant 18K gold ring with premium diamond setting",
    "price": 125000,
    "category": "rings",
    "material": "diamond",
    "weight": 5.2,
    "stock": 15,
    "images": ["https://images.unsplash.com/photo-1605100804763-247f67b3557e"],
    "inStock": true,
    "createdAt": "2026-02-08T00:00:00.000Z",
    "updatedAt": "2026-02-08T00:00:00.000Z"
  },
  "message": "Product retrieved successfully",
  "error": null
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "data": null,
  "message": "Invalid ID format",
  "error": "Please provide a valid MongoDB ObjectId"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Product not found",
  "error": "No product with ID: 507f1f77bcf86cd799439011"
}
```

---

### Cart

#### POST /api/cart

Add an item to the cart. If no `cartId` is provided, a new cart will be created.

**Request Body:**
```json
{
  "cartId": "507f1f77bcf86cd799439012",  // Optional
  "productId": "507f1f77bcf86cd799439011",  // Required
  "quantity": 2  // Required, must be > 0
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "guest",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Royal Diamond Ring",
          "price": 125000,
          ...
        },
        "quantity": 2,
        "priceAtAdd": 125000,
        "_id": "507f1f77bcf86cd799439013"
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

**Validation Errors:**

Invalid Product ID (400):
```json
{
  "success": false,
  "data": null,
  "message": "Invalid product ID format",
  "error": "Please provide a valid product ID"
}
```

Product Not Found (404):
```json
{
  "success": false,
  "data": null,
  "message": "Product not found",
  "error": "No product found with ID: 507f1f77bcf86cd799439011"
}
```

Insufficient Stock (400):
```json
{
  "success": false,
  "data": null,
  "message": "Insufficient stock",
  "error": "Only 5 units available for Royal Diamond Ring"
}
```

Invalid Quantity (400):
```json
{
  "success": false,
  "data": null,
  "message": "Invalid quantity",
  "error": "Quantity must be greater than 0"
}
```

#### GET /api/cart/:cartId

Retrieve cart contents with populated product details.

**URL Parameters:**
- `cartId` (string, required): MongoDB ObjectId of the cart

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "guest",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Royal Diamond Ring",
          "price": 125000,
          "images": ["https://..."],
          "stock": 15,
          ...
        },
        "quantity": 2,
        "priceAtAdd": 125000
      }
    ],
    "totalAmount": 250000,
    "createdAt": "2026-02-08T00:00:00.000Z",
    "updatedAt": "2026-02-08T00:00:00.000Z"
  },
  "message": "Cart retrieved successfully",
  "error": null
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "data": null,
  "message": "Invalid cart ID format",
  "error": "Please provide a valid MongoDB ObjectId"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Cart not found",
  "error": "No cart found with ID: 507f1f77bcf86cd799439012"
}
```

#### PUT /api/cart/:cartId/items/:productId

Update the quantity of an item in the cart. Setting quantity to 0 removes the item.

**URL Parameters:**
- `cartId` (string, required): MongoDB ObjectId of the cart
- `productId` (string, required): MongoDB ObjectId of the product

**Request Body:**
```json
{
  "quantity": 3  // Required, >= 0
}
```

**Response (200 OK):**
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

**Validation Errors:**

Invalid Quantity (400):
```json
{
  "success": false,
  "data": null,
  "message": "Invalid quantity",
  "error": "Quantity cannot be negative"
}
```

Insufficient Stock (400):
```json
{
  "success": false,
  "data": null,
  "message": "Insufficient stock",
  "error": "Only 15 units available for Royal Diamond Ring"
}
```

Item Not Found (404):
```json
{
  "success": false,
  "data": null,
  "message": "Item not found in cart",
  "error": "Product not found in cart"
}
```

#### DELETE /api/cart/:cartId/items/:productId

Remove a specific item from the cart.

**URL Parameters:**
- `cartId` (string, required): MongoDB ObjectId of the cart
- `productId` (string, required): MongoDB ObjectId of the product

**Response (200 OK):**
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

**Response (404 Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Item not found in cart",
  "error": "Product not found in cart"
}
```

#### DELETE /api/cart/:cartId

Clear all items from the cart.

**URL Parameters:**
- `cartId` (string, required): MongoDB ObjectId of the cart

**Response (200 OK):**
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

---

## Error Handling

### Error Response Format

All errors follow the same response structure:

```json
{
  "success": false,
  "data": null,
  "message": "Human-readable error message",
  "error": "Detailed error information"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error, invalid input)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected server error)

### Common Errors

#### Validation Error (400)
```json
{
  "success": false,
  "data": null,
  "message": "Validation Error",
  "error": "Product name is required, Product price is required"
}
```

#### Cast Error (400)
```json
{
  "success": false,
  "data": null,
  "message": "Invalid ID format",
  "error": "Cast to ObjectId failed for value \"invalid\" at path \"_id\""
}
```

#### Internal Server Error (500)
```json
{
  "success": false,
  "data": null,
  "message": "Internal server error",
  "error": "Error details (only in development mode)"
}
```

---

## Data Models

### Product Schema

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, enum: ['rings', 'necklaces', 'earrings', 'bracelets', 'pendants']),
  material: String (required, enum: ['gold', 'silver', 'platinum', 'diamond']),
  weight: Number (required),
  stock: Number (required, min: 0, default: 0),
  images: [String],
  inStock: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema

```javascript
{
  userId: String (default: 'guest'),
  items: [
    {
      productId: ObjectId (ref: 'Product'),
      quantity: Number (required, min: 1),
      priceAtAdd: Number (required, min: 0)
    }
  ],
  totalAmount: Number (required, default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented.

**Future Implementation:** Rate limiting will be added to prevent abuse.

---

## CORS

CORS is enabled for all origins in development. In production, configure allowed origins in the backend configuration.

---

## Testing

### Using cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"507f1f77bcf86cd799439011","quantity":2}'

# Update quantity
curl -X PUT http://localhost:5000/api/cart/507f1f77bcf86cd799439012/items/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"quantity":3}'

# Remove item
curl -X DELETE http://localhost:5000/api/cart/507f1f77bcf86cd799439012/items/507f1f77bcf86cd799439011
```

### Using Postman

Import the API collection (coming soon) or manually create requests using the examples above.

---

## Changelog

### Version 1.0.0 (2026-02-08)
- Initial release
- Product listing and retrieval
- Cart management (add, update, remove, clear)
- Input validation
- Error handling
- Health check endpoint

---

## Support

For API issues or questions:
1. Check this documentation
2. Review error messages
3. Create an issue on GitHub
