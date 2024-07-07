const express = require('express');
const cors = require('cors'); // Importer le package CORS
const sequelize = require('./config/db.config'); // Importer la configuration de Sequelize
const productRoutes = require('./routes/productRoutes'); // Importer les routes des produits
const cartRoutes = require('./routes/cartRoutes'); // Importer les routes du panier
const userRoutes = require('./routes/userRoutes'); // Importer les routes des utilisateurs

const app = express();
const port = 5352;

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS pour autoriser les requêtes depuis tous les domaines
app.use(cors());

// Utiliser les routes des produits, du panier et des utilisateurs
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// Connexion à MySQL via Sequelize
sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connected...');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
