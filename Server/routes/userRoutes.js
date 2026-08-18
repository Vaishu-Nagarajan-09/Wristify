const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(200).json({
            message: "User Register Successfully",
            user
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


router.post('/login', async(req, res) => {
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            message: "Login successful",
            token
        })

    }
    catch(e){
        console.log(e.message);
    }
})

router.get('/profile', authMiddleware, async(req, res) => {
    const user = await User.findById(req.user.id);

     if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

    return res.status(200).json({
        message: "Profile fetched Successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})

module.exports = router;