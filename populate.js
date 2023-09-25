require('dotenv').config()
require('express-async-errors')
const Task = require('./models/product')
const products = require('./products.json')
const app = require('express')()
const connectDB = require('./db/connect')
const url = process.env.url
const connectToDb=async()=>{
    await connectDB(url)
    console.log('connected to db')
    await Task.deleteMany()
    await Task.create(products)
    console.log('success')
    process.exit(0) //success 0
}
connectToDb()
