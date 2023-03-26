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


router.get("/focus",async function(req,res){
    const user=isAuth(req);
    if(user)
    res.render("FacePose.ejs");
    else console.log("invalid focus request");
    // console.log("emotions incoming "+ find.emotions);
})


module.exports=router;