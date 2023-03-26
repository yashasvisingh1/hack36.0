const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));
const isAuth = require("./isauth");
const Doc=require("../../src/models/docdata");
const UserData=require("../../src/models/userdata");


router.post("/form",async function(req,res){
    console.log("heheheh");
  const user=await isAuth(req);
  if(user){
    const name=user.username
    const email=user.email
    console.log(req.body);
    let userData=new UserData({
      personalInfo:{
        name:name,
        age:req.body.age,
        phone:req.body.phone,
        city:req.body.city,
        email:email,
        country:req.body.country,
      },
      keywords:[req.body.category],
      email:email
    })
    await userData.save();
    if(req.body.code==="111"){
      const abc=await UserData.findOneAndUpdate({email:email},{isdoctor:true});
      const a=new Doc({
        username:user.username,
        email:user.email
      })
      await a.save();
    }
    console.log(userData);
    res.redirect("/secrets");
  }else{
    console.log("error")
  }
});
module.exports=router;