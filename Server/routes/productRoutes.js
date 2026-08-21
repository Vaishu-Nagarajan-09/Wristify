const express = require("express");
const Product = require("../models/product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


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


//admin -- get all products

router.get('/admin/all', authMiddleware, adminMiddleware, async(req,res) => {
    try{
        const products = await Product.find();

        return res.status(200).json({
            products
        });
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//admin -- add products
router.post('/admin', authMiddleware, adminMiddleware, async(req,res) => {
    try{
        const {id, name, brand, price, description, image, stock, rating} = req.body;

        const product = await Product.create({
            id, name, brand, price, description, image, stock, rating
        });

        return res.status(201).json({
            message: "Product created Successfully",
            product
        });
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//admin -- update
router.put('/admin/:id', authMiddleware, adminMiddleware, async(req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!product){
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            message: "Product Updated Successfully",
            product
        });
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//admin -- delete

router.delete('/admin/:id', authMiddleware, adminMiddleware, async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if(!product){
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            message: "Product Deleted Successfully"
        });
    }
    catch(e){
        console.log(e.message);

        return res.status(500).json({
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