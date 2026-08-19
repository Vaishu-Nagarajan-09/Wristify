const express = require('express');
const Order = require('../models/order');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async(req,res,next) => {
    try{
        const{products, shippingAddress, totalAmount} = req.body;

    if(!products || products.length === 0){
        return res.status(400).json({
            message: "Cart is empty."
        });
    }

    if(!shippingAddress){
        return res.status(400).json({
            message: "Shipping Address is required."
        });
    }

    const newOrder = await Order.create({
        user: req.user.id,
        products,
        shippingAddress,
        totalAmount
    });

    return res.status(201).json({
        message: "Order Created Successfully",
        order: newOrder
    });
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

});

router.get('/my-orders', authMiddleware, async(req,res) => {
    try{
        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");
        
        return res.status(200).json({
            orders
        })
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

module.exports = router;