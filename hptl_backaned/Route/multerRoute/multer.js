const express = require('express')
const connection = require('../../Model/db_connection')

const multerRoute =express.Router();
 
 const {upload} = require('../../Controller/MulterController/multer')
 
 multerRoute.post('/post/multer',upload.single("image"),)
  
module.exports = {multerRoute}  