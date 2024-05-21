const inventoryModel=require("../models/inventoryModel");
//import { populate } from './../node_modules/dotenv/lib/main.d';
const userModel=require("../models/user.model");
//CREATE INVENTORY

const createInventoryController=async (req,res)=>{
    try {
        const {email,inventoryType}=req.body
        //Validation
        const user= await userModel.findOne({email})
       if(!user)
        {
            throw new Error("User not found")
        }
        if(inventoryType==='in'&& user.role!=='donor'){
            throw new Error("Not a donor account")


        }
        if(inventoryType==='out'&& user.role!=='hospita'){
            throw new Error("Not a hospital")
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
            message:"Error in getting the records"
        })
        
    }
}

module.exports={createInventoryController,getInventoryController}