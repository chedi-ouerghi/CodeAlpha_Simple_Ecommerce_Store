const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route pour récupérer tous les produits
router.get('/products', productController.getAllProducts);

// Route pour récupérer un produit par son ID
router.get('/products/:id', productController.getProductById);

// Route pour ajouter un nouveau produit
router.post('/create', productController.createProduct);

// Route pour mettre à jour un produit existant
router.put('/products/:id', productController.updateProduct);

// Route pour supprimer un produit
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
