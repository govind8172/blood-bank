const express= require('express')
const { registerController, loginController, currentUserController } = require('../controllers/auth.controller')
const authMiddleware=require("../middlewares/authMiddleware")

const router= express.Router()


//routes
//register
router.post('/register',registerController)
//login||post
router.post('/login',loginController)
//current user|| GET

router.get('/current-user',authMiddleware,currentUserController)
module.exports= router;