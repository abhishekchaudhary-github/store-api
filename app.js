const app = require('express')()
require('dotenv').config()
const erroHandle = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const port = process.env.port || 5000
const url = process.env.url

const connectToDb=async()=>{
    await connectDB(url)
    console.log('connected to db')
    app.listen(port)
    console.log('connected to server')
}
app.use(notFound)
app.use(erroHandle)
connectToDb()
