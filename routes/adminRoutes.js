const express = require("express");
const authMiddelware=require("../middlewares/authMiddleware")
const {
  getDonorsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonorController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonorsListController
);
//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
//GET || ORG LIST
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);
// ==========================

// DELETE DONoR || GET
router.delete(
  "/delete-donor/:id",
  authMiddelware,
  adminMiddleware,
  deleteDonorController
);

//EXPORT
module.exports = router;