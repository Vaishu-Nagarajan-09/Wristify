const express = require("express");
const Product = require("../models/product");


const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({
            message: "Product Data Successfully",
            products
        });
    }
    catch(e){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


router.get('/:id', async (req, res) => {
    try{
        const product = await Product.findOne({id: Number(req.params.id)});

        if(!product){
            return res.status(404).json({
                message: "Not Found"
            });
        }
        return res.status(200).json({
            message: "Product Found Successfully",
            product
        })
       
    }
    catch(e){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

module.exports = router;