require("../db/connection");
const mongoose = require("mongoose");

const blogDataSchema={
    email:String,
    name:String,
    title:String,
    body:String,
    keywords:[],
    comment:[{
        user:String,
        msg:String,
    }],
    rating:Number,
    img:String,
}

const blogData = new mongoose.model("blogdata", blogDataSchema);
module.exports = blogData;