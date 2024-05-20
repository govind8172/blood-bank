const inventoryModel=require("../models/inventoryModel");
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

module.exports={createInventoryController}