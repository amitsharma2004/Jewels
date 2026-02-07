const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const seedData = require('../data/seedData');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared');

    // Insert seed data
    const products = await Product.insertMany(seedData);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
