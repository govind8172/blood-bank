// const mongoose=require ('mongoose')
//  const connectDB= async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log(`Connected to mongo db successfully${mongoose.connection.host}`)

//     }
//     catch(error){
//         console.log(`Mongodb connection failed ${error}`)
//     }
//  }
//  module.exports=connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log(`Connected to MongoDB successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection failed: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
