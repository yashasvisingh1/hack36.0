const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const patientdata=require("../../src/models/patientsdata");
const isAuth = require("../auth/isauth");

router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.post("/sendpatientsdata/:roomid",async function(req,res){
    const user=await isAuth()
})