const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { default: React } = require('react');
const { useNavigate } = require('react-router-dom');
const jwtSecret = "mysecretkey";
 

// Route 1: Create a User using: POST "/api/createuser". No login required
router.post(
    "/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 3 }),
        body('password','Incorrect password').isLength({ min: 8 })
    ],
    
    async (req, res) => {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
         const salt  = await bcrypt.genSalt(10);
         let secPassward = await bcrypt.hash(req.body.password , salt);

         // Create a new user
         
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassward,
            Location: req.body.Location
        });

        return res.json({ success: true });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    }
);
router.post(
    
    "/loginuser",
    [
        body('email').isEmail(),
        body('password').isLength({ min: 8 })
    ],

    async (req, res) => {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        let email = req.body.email; 

        try {
            let userData = await User.findOne({ email: email });
            if (!userData) {
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password , userData.password);
            if(!pwdCompare){
                return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data ={
                user: { id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            if(!authToken){
                return res.status(500).json({ success: false, error: "Internal Server Error" });
            }
            return res.json({ success: true, authToken: authToken });
            
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

module.exports = router;

