const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3")
const connection = require('../../Model/db_connection')

// Configure AWS SDK
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
const storage1 =  multerS3({
      s3: s3,
      bucket: "nodeimage12",
      acl: "public-read", // Change the permission as needed
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname); // corrected the key function
        console.log(file)
      },
    })

    let upload = multer({storage:storage1})

module.exports = {upload}
