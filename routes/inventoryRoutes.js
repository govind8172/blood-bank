const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController, getDonorsController, getOrganisationController, getHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController')

const router=express.Router()

//routes
//add inventory||POSt
router.post('/create-inventory',authMiddleware,createInventoryController);

//GET all blood records
router.get('/get-inventory',authMiddleware,getInventoryController);
//get recent
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController);




router.get('/get-donors',authMiddleware,getDonorsController);

router.get('/get-organisation',authMiddleware,getOrganisationController);
router.get('/get-hospitals',authMiddleware,getHospitalController);

router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController);


module.exports=router