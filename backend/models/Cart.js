const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Product = require('./Product'); // Assurez-vous que le chemin vers votre modèle Product est correct
const User = require('./User'); // Assurez-vous que le chemin vers votre modèle User est correct

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'cart'
});

Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); // Association avec Product
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Association avec User

module.exports = Cart;
