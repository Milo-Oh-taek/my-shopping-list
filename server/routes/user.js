const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const CustomError = require('../common/customError');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            throw new CustomError('Invalid form.');
        }

        const exist = await User.findOne({ email });
        if(!exist){
            throw new CustomError('Email not exists.');
        }

        await bcrypt.compare(password, exist.password).then((result) => {
            if(!result){
                throw new CustomError('Password incorrect');
            }
        });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d'});

        res.cookie('shoppingUser', token);
        res.status(200).send();
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            throw new CustomError('Invalid form.');
        }

        const exist = await User.findOne({ email });
        if(exist){
            throw new CustomError('Email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        await User.create({
            email,
            password: hashedPassword,
        });

        res.sendStatus(201);
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});


module.exports = router;