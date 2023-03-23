require("../db/connection");
const mongoose = require("mongoose");

const blogDataSchema={
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    keywords:String,
    comment:[{
        user:String,
        msg:String,
    }],
    likedUsers:[],
    rating:Number,
    img:String,
}

const blogData = new mongoose.model("blogdata", blogDataSchema);
module.exports = blogData;