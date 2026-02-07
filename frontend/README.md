# Naksh Jewels Frontend

React frontend for the Naksh Jewels E-Commerce Platform.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route components
├── store/          # Redux store and slices
│   └── slices/     # Redux slices (cart, products)
├── services/       # API service layer
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
└── styles/         # Global styles and CSS
```

## Installation

```bash
npm install
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update `VITE_API_URL` with your backend URL

```bash
cp .env.example .env
```

## Development

```bash
# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- Redux state management with Redux Toolkit
- Axios interceptors for API error handling
- React Router for navigation
- CSS variables for theming
- Barrel exports for clean imports

## Architecture

### State Management
- **Cart Slice**: Manages shopping cart state
- **Product Slice**: Manages product catalog state

### Services
- **API**: Axios instance with interceptors
- **Product Service**: Product-related API calls
- **Cart Service**: Cart-related API calls

### Styling
- CSS variables for consistent theming
- Jewelry-inspired color palette (gold, elegant tones)
- No external UI libraries

## Available Routes

- `/` - Home page
- `/products` - Product catalog
- `/cart` - Shopping cart
