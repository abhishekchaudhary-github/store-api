const app = require('express')()
require('express-async-errors')
require('dotenv').config()
const erroHandle = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const port = process.env.port || 5000
const url = process.env.url
const store = require('./routes/products')

const connectToDb=async()=>{
    await connectDB(url)
    console.log('connected to db')
    app.listen(port)
    console.log('connected to server')
}
app.use('/',store)
app.use(notFound)
app.use(erroHandle)
connectToDb()
