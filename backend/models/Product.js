const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Product;
