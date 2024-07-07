const Cart = require('../models/Cart');

// Récupérer le contenu du panier
exports.getCartContents = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId: req.params.userId },
            include: ['product', 'user'] // Utilisation des alias définis dans les associations
        });
        res.json(cartItems);
    } catch (err) {
        console.error('Error fetching cart contents:', err);
        res.status(500).json({ error: 'Error fetching cart contents' });
    }
};

// Autres méthodes du contrôleur (ajouter au panier, supprimer du panier, etc.)

// Ajouter un produit au panier d'un utilisateur spécifique
exports.addToCart = async (req, res) => {
    const { productId, quantity, userId } = req.body;
    try {
        const newCartItem = await Cart.create({ productId, quantity, userId });
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
};

// Supprimer un produit du panier d'un utilisateur spécifique
exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.params;
    try {
        const cartItem = await Cart.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        await cartItem.destroy();
        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Error removing from cart' });
    }
};
