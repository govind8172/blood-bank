const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    role:{
        type:String,
        required:[true,'role is needed'],
        enum:['admin','organization','donor','hospital']
    },
    name:{
        type:String,
        require: function(){
            if(this.role==='donor'||this.role==='admin'){
                return true
            }
            return false
        }
    },
    organization:{
        type: String,
        require: function(){
            if(this.role==='organization'){
                return true
            }
            return false
        }
    },
    hospital:{
        type: String,
        require: function(){
            if(this.role==='hospital'){
                return true
            }
            return false
        }
    },
    email:{
        type:String,
        require:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'password is required'],

    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    phone:{
        type:String,
        required:[true,'phone number is required for emergency']
    },
    
},{timestamps:true});

module.exports=mongoose.model('users',userSchema)