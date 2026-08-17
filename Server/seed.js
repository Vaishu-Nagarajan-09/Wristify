require("dotenv").config();

const ConnectDB = require('./config/db');
const Product = require('./models/product');
const products = require('./data/products');
const mongoose = require('mongoose');

const seedProduct = async () => {
    try{
        await ConnectDB();
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Products Seeded Successfully")
    }
    catch(e){
        console.log(e.message);
    }
    finally{
        mongoose.connection.close();
    }
}

seedProduct();