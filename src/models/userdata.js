require("../db/connection");
const mongoose = require("mongoose");

const userDataSchema={
    personalInfo:{
        name:String,
        dob:Date,
        gender:String,
        phone:String,
        city:String,
        email:String,
        country:String,
    },
    messages:{
        message:String,
        user:String,
        isViewed:Boolean
    },
    keywords:[],
    pastScore:Number,
    minutesMeditated:Number,
    subscribed:Boolean,
    isdoctor:false,
}

const UserData = new mongoose.model("Userdata", userDataSchema);
module.exports = UserData;