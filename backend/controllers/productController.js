const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// Récupérer un produit par son ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ error: 'Error fetching product' });
    }
};

// Ajouter un nouveau produit
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const newProduct = await Product.create({ name, description, price });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Error creating product' });
    }
};

// Mettre à jour un produit existant
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();
        res.json(product);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Error updating product' });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Error deleting product' });
    }
};
