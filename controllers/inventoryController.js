const {  mongoose } = require("mongoose");
const inventoryModel=require("../models/inventoryModel");
//import { populate } from './../node_modules/dotenv/lib/main.d';
const userModel=require("../models/userModel");



//CREATE INVENTORY

const createInventoryController=async (req,res)=>{
    try {
        const {email}=req.body
        //Validation
        const user= await userModel.findOne({email})
       if(!user)
        {
            throw new Error("User not found")
        }
        // if(inventoryType==='in'&& user.role!=='donor'){
        //     throw new Error("Not a donor account")


        //}
        // if(inventoryType==='out'&& user.role!=='hospita'){
        //     throw new Error("Not a hospital")
        // }
          if(req.body.inventoryType=='out'){
            const requestedBloodGroup=req.body.bloodGroup
            const requestedQuantityOfBlood=req.body.quantity
            const organisation=new mongoose.Types.ObjectId(req.body.userId)
            //calculation in
            const totalInOfRequestedBloodGroup= await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup
                }},
                {$group:{
                    _id:'bloodGroup',
                    total: {$sum: '$quantity'}
                }}
            ])
           // console.log("totla in",totalInOfRequestedBlood);
             //out
             const totalIn=totalInOfRequestedBloodGroup[0]?.total||0;

             const totalOutOfRequestedBloodGroup=await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:'out',
                    bloodGroup:requestedBloodGroup
                }},
                {
                    $group:{
                        _id:'$bloodGroup',
                        total:{$sum:'$quantity'}
                    }
                }
             ]);
             const totalOut=totalOutOfRequestedBloodGroup[0]?.total||0;

             const availableQuantityOfBloodGroup=totalIn-totalOut
             //quantity validation
             if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
                return res.status(500).send({
               success:false,
               message:`Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup} is available`
            })
        }
            req.body.hospital=user?._id;

          
        }else{
            req.body.donor=user?._id;
        }
        //save record
        const inventory=new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message:"New blood record is added"
        })
            
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in creating inventroy API",
            error
        })
    }
}

//GET all blood records
const getInventoryController=async(req,res)=>{
    try {
        const inventory= await inventoryModel.find({organisation:req.body.userId}).populate("donor")
        .populate("hospital").sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"got all records successfully",
            inventory
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message:"Error in getting the records",
            error
        })
        
    }
}
//get blood records of 3

const getRecentInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          organisation: req.body.userId,
        })
        .limit(3)
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        message: "recent Inventory Data",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Recent Inventory API",
        error,
      });
    }
  };




//GET donor records
const getDonorsController=async(req,res)=>{
    try {
       const organisation=req.body.userId
       //find donors
       const donorId= await inventoryModel.distinct("donor",{
        organisation,
       });
       //console.log(donorId);
       const donors=await userModel.find({_id:{$in:donorId}})


       return res.status(200).send({
        success:true,
        message:'Donors fetched successfully',
        donors
       })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in donor records',
            error
        })
        
    }

}

const getOrganisationController=async (req,res)=>{
    try {
        const donor=req.body.userId
        const orgId=await inventoryModel.distinct("orgainsation",{
            donor
        })

        //find org
        const organisations=await userModel.find({_id:{$in:orgId}})
        res.status(200).send({
            success:true,
            message:'Organisations fetched successfully',
            organisations
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in fetching organisations',
            error
        })
    }

}
const getHospitalController=  async(req,res)=>{
    try {
        const organisation=req.body.userId
        const hospitalId=await inventoryModel.distinct("hospital",{organisation})

        //find hospital
        const hospitals=await userModel.find({_id:{$in:hospitalId}})
        res.status(200).send({
            success:true,
            message:'Hospitals fetched successfully',
            hospitals
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in fetching hospitals.",
            error
        })
    }

}
//get hospital blood records
const getInventoryHospitalController=async(req,res)=>{
    try {
        const inventory= await inventoryModel.find(req.body.filters).populate("donor")
        .populate("hospital").populate("organisation").sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"got all hospital consumer records successfully",
            inventory
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message:"Error in getting consumer records"
        })
        
    }
}

module.exports={createInventoryController,
    getInventoryController,
    getDonorsController,
    getOrganisationController,
    getHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController}