const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const Item = require('../models/item');
const multer = require("multer");
const jwtDecoder = require('../common/jwtDecoder');
const CustomError = require('../common/customError');
const imgUpload = require('../common/imgUpload');

router.get('/', async (req, res) => {
    try{
        const token = req.query.token;
        const email = jwt.verify(token, process.env.JWT_SECRET).email;

        if(!email){
            throw new CustomError('Invalid form.');
        }

        const result = await Item.find({ email }).sort({createdAt:-1});
        res.json(result);
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

router.post('/', imgUpload.single('image'), async (req, res) => {

    try {
        if(req.fileValidationError){
            throw new CustomError('File type not allowed');
        }

        const { token, name, brand, price, category } = req.body;
        const email = jwtDecoder(token);

        if(!email || !name){
            return res.status(500).send();
        }

        const itemInfo = { email, name, brand, price, category, image: req.fileSavename };
        const image = req.file?.filename;
        if(image)  itemInfo.image = image;

        const newItem = await Item.create(itemInfo);

        res.json(newItem);
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

router.patch('/:itemId', async (req, res) => {
    
    try {
        const { done, token } = req.body;
        if(!token) throw new CustomError('Error');

        const updateItem = await Item.updateOne({
            "_id": req.params.itemId
        },{ $set: { done }} );

        res.json(updateItem);
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const newItem = await Item.deleteOne({
            "_id": req.params.itemId,
        });
        res.sendStatus(200);
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

module.exports = router;