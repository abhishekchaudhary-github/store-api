const mongoose = require('mongoose')
const connectDB = require('../db/connect')

const schema = new mongoose.Schema({
    featured : {
        type : Boolean,
        default : false 
    } , createdAt:Date , 
    company:{
        type : String,
        enum : {
            values : ["ikea","liddy","caressa","marcos"],
            message : '{VALUE} is not supported'
    },
        required : [true , "field is required"]
    }
    , price:Number , 
    name : {
        type : String,
        required : [true,"must not be empty"],
        maxlength : [10,"must be less than 11 length"]
    }, rating : Number
})

module.export = mongoose.model('Store',schema);