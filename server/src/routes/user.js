const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('../middleware/uploadMiddleware')
const User =require('../controller/user')
router.post('/register', upload, User.registerUser)
router.post('/login', User.loginUser)
router.get('/avatar/:id',User.getAvatar)
module.exports=router;
const  upload='../middleware/uploadMiddleware'