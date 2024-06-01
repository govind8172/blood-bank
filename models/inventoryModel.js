const mongoose= require('mongoose')

const inventorySchema= new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,'Inventory type is required'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required:[true,'Blood group is required'],
        enum:['A-','A+','B+','B-','AB+','AB-','O+','O-']
    },
    email:{
        type:String,
        required: [true,"Email is required for contact"]
        
    },
    organisation:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:[true,'Organisation is required']

    },
    quantity:{
        type:Number,
        required: [true,"Quantity is required"]     
    },
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required: function(){
            return this.inventoryType=="out";
        }
    },
    donor:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required: function(){
            return this.inventoryType=="in";
        }
    },


},
{timestamps:true}
);
  

module.exports=mongoose.model('Inventory',inventorySchema)