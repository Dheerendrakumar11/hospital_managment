const express = require('express');

const profileRouter = express.Router();
const multerRoute =express.Router();
 
 const {upload} = require('../../Controller/MulterController/multer')
const {getProfile,getProfilebyId,postProfile,putProfile,deleteProfile} = require('../../Controller/emp_profileController/emp_profileCotroller')

profileRouter.get('/profile/get',getProfile)
profileRouter.get('/profile',getProfilebyId)
profileRouter.post('/profile/post',upload.single("image"),postProfile)
profileRouter.put('/profile',putProfile)
profileRouter.delete('/profile',deleteProfile)

module.exports = {profileRouter}