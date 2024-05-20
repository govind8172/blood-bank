const mongoose=require ('mongoose')
 const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongo db successfully${mongoose.connection.host}`)

    }
    catch(error){
        console.log(`Mongodb connection failed ${error}`)
    }
 }
 module.exports=connectDB