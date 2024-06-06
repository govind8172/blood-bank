const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController, getDonorsController, getOrganisationController, getHospitalController } = require('../controllers/inventoryController')

const router=express.Router()

//routes
//add inventory||POSt
router.post('/create-inventory',authMiddleware,createInventoryController);

//GET all records
router.get('/get-inventory',authMiddleware,getInventoryController);



router.get('/get-donors',authMiddleware,getDonorsController);

router.get('/get-organisation',authMiddleware,getOrganisationController);
router.get('/get-hospitals',authMiddleware,getHospitalController);



module.exports=router