const express= require('express')
const dotenv= require('dotenv')
const colors= require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB = require('./config/db')
const path=require('path')

dotenv.config();
//mongodb connection
connectDB();

//rest object

const app= express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes

app.use('/api/v1/auth',require("./routes/auth.routes"));

app.use('/api/v1/inventory',require("./routes/inventoryRoutes"));
app.use('/api/v1/analytics',require("./routes/analyticsRoutes"));
app.use('/api/v1/admin',require("./routes/adminRoutes"));




app.get('/',(req,res)=>{
    res.status(200).json({
        message: "wlcm to blood bank app",
    })
})

//static file
app.use(express.static(path.join(__dirname,'./client/build')))

//static routes
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
//port
const PORT=process.env.PORT||8000;

//listen
app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} ModeON port ${process.env.PORT}`.bgCyan);
})