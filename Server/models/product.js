const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }, 
    stock: {
        type: Number,
    },
    rating: {
        type: Number
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;