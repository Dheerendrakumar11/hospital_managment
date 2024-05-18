const express = require('express');
const AuthRouter = express.Router()

const {userSignUP,loginUser,getApi} = require('../../Controller/userAuthentication/UserAuthentication')


AuthRouter.post('/auth/signup',userSignUP)
AuthRouter.post('/auth/login',loginUser)

module.exports = {AuthRouter}