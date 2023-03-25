const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const isAuth = require("../auth/isauth");
const patientdata=require("../../src/models/patientsdata");
const userdata=require("../../src/models/userdata");
const patientData = require("../../src/models/patientsdata");

router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.get("/viewdata/:roomid",async function(req,res){
    var room=req.params.roomid;
    try{
        res.status(200).render("./patient/showdata");
    }catch(e){
        console.log(e);
    }
})


router.get("/getarray",async function(req,res){
    console.log("getarray called");
    const user=await isAuth(req);
    const email=user.email;
    const find=await patientdata.findOne({email:email});
    var array=find.emotions;
    res.status(200).json({emotions:array});
    // console.log("emotions incoming "+ find.emotions);
})


module.exports=router;