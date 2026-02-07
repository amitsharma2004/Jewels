# Cart API Documentation

## Endpoints

### 1. Add Item to Cart
**POST** `/api/cart`

Creates a new cart or adds item to existing cart.

**Request Body:**
```json
{
  "cartId": "optional_cart_id",
  "productId": "product_id",
  "quantity": 2
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "guest",
    "items": [
      {
        "productId": "product_details",
        "quantity": 2,
        "priceAtAdd": 125000
      }
    ],
    "totalAmount": 250000,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "Item added to cart successfully",
  "error": null
}
```

**Error Responses:**
- 400: Invalid product ID, invalid quantity, insufficient stock
- 404: Product not found

---

### 2. Get Cart Contents
**GET** `/api/cart/:cartId`

Retrieves cart with populated product details.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "items": [...],
    "totalAmount": 250000
  },
  "message": "Cart retrieved successfully",
  "error": null
}
```

**Error Responses:**
- 400: Invalid cart ID format
- 404: Cart not found

---

### 3. Update Item Quantity
**PUT** `/api/cart/:cartId/items/:productId`

Updates quantity of item in cart. Set quantity to 0 to remove item.

**Request Body:**
```json
{
  "quantity": 3
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "items": [...],
    "totalAmount": 375000
  },
  "message": "Cart updated successfully",
  "error": null
}
```

**Error Responses:**
- 400: Invalid cart ID, invalid quantity, insufficient stock
- 404: Cart not found, item not found in cart

---

### 4. Remove Item from Cart
**DELETE** `/api/cart/:cartId/items/:productId`

Removes specific item from cart.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "items": [...],
    "totalAmount": 125000
  },
  "message": "Item removed from cart successfully",
  "error": null
}
```

**Error Responses:**
- 400: Invalid cart ID format
- 404: Cart not found, item not found in cart

---

### 5. Clear Cart
**DELETE** `/api/cart/:cartId`

Removes all items from cart.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "items": [],
    "totalAmount": 0
  },
  "message": "Cart cleared successfully",
  "error": null
}
```

**Error Responses:**
- 400: Invalid cart ID format
- 404: Cart not found

---

## Business Rules

1. **Stock Validation**: Cannot add more items than available stock
2. **Price Snapshot**: Price is captured when item is added (priceAtAdd)
3. **Auto-create Cart**: First add creates a new cart automatically
4. **Auto-calculate Totals**: Total amount recalculated on every modification
5. **Quantity Zero**: Setting quantity to 0 removes the item
6. **Atomic Operations**: All validations pass before saving

## Validation Rules

- Product ID must be valid MongoDB ObjectId
- Product must exist in database
- Product must be in stock
- Quantity must be positive integer
- Quantity cannot exceed available stock
- Cart ID must be valid MongoDB ObjectId (when provided)

## Error Messages

- "Product not found"
- "Insufficient stock"
- "Invalid quantity"
- "Cart not found"
- "Item not found in cart"
- "Invalid ID format"
