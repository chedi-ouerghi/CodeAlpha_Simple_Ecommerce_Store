const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes pour le panier
router.get('/cart/:userId', cartController.getCartContents);
router.post('/cart', cartController.addToCart);
router.delete('/cart/:cartItemId', cartController.removeFromCart);

module.exports = router;
