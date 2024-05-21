const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController')

const router=express.Router()

//routes
//add inventory||POSt
router.post('/create-inventory',authMiddleware,createInventoryController);

//GET all records
router.get('/get-inventory',authMiddleware,getInventoryController);




module.exports=router