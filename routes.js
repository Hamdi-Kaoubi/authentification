const express=require('express')
const { isAuth } = require('./middleWare/isAuth')
const { registerValidator, validation, loginValidator } = require('./middleWare/validation')
const { Register, Login } = require('./userControllers')
const router=express.Router()
router.post('/',registerValidator,validation,Register)
router.post('/login',loginValidator,validation,Login)
router.get('/current',isAuth,(req,res)=>res.send({ user: req.user }))
module.exports=router