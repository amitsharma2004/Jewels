const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const validateId = require('../middleware/validateId');

router.get('/', getAllProducts);
router.get('/:id', validateId, getProductById);

module.exports = router;
