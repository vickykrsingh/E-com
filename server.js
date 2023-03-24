// packages import
import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from "./Config/db.js";
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoutes.js'

// rest object
const app = express();


// configuration environment
dotenv.config()

// configuration DATABASE
connectDB()

// middleWares
app.use(express.json())
app.use(morgan('dev'))

// Accessing Environment variables
const PORT = process.env.PORT || 8080
const Mode = process.env.MODE

// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoute)

// Rest api
app.get('/',(req,res) => {
    res.send('hello world this is our home page')
})


// Server listening
app.listen(PORT,()=>{console.log(`Server is running on ${Mode} mode and the port no ${PORT}`.bgCyan.white)})