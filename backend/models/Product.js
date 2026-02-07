const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['rings', 'necklaces', 'earrings', 'bracelets', 'pendants']
  },
  material: {
    type: String,
    required: true,
    enum: ['gold', 'silver', 'platinum', 'diamond']
  },
  weight: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
