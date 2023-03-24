require("../db/connection");
const mongoose = require("mongoose");

const patientDataSchema={
    roomid:String,
    emotions:[],
}

const patientData = new mongoose.model("patientData", patientDataSchema);
module.exports = blogData;