const path = require('path');
const multer = require("multer");
const multerS3 = require('multer-s3'); 
const AWS = require("aws-sdk");
const dotenv = require('dotenv'); 
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

const s3 = new AWS.S3({
    accessKeyId: process.env.IAM_KEY_ID,
    secretAccessKey: process.env.IAM_SECRET_KEY,
    region: process.env.REGION,
});

const storage = multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read-write',
    key: function(req, file, cb){
        let ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(new Error('goes wrong on the mimetype'));
        }
        let savename = Date.now().toString()+ext;
        req.fileSavename = savename;
        cb(null, savename);
    },
})

const limits = { fileSize: 5 * 1024 * 1024 };

module.exports = multer({ storage, limits });