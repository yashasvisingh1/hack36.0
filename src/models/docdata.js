require("../db/connection");
const mongoose=require("mongoose");

const docSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    }
});

const Doc = new mongoose.model("Doc",docSchema);
module.exports = Doc;