const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const patientdata=require("../../src/models/patientsdata");
const userdata=require("../../src/models/userdata");
const isAuth = require("../auth/isauth");

router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.post("/sendpatientsdata/:roomid",async function(req,res){
    var data=req.body.net;
    var room=req.params.roomid;
    console.log(data);
    const user=await isAuth(req);
    const email=user.email;
    // console.log(email);
    const result=await userdata.findOne({email:email});
    // console.log(result.isdoctor);
    if(result.isdoctor==false){
        // console.log("not a doctor");
        const result1=await patientdata.findOne({email:email,roomid:room});
        // console.log("result1 "+result1);
        if(result1==""){
            // console.log("nt doctor");
            let patient=new patientdata({
                email:email,
                roomid:room,
                emotions:data
            });
            patient.save();
        }
        else{
            // console.log("updated patients data");
            let result1=await patientdata.updateOne({email:email},{
                $set:{
                    emotions:data
                }
            });
            console.log("emotions storing: "+result1);
        }
        
    }
    
})

module.exports=router;