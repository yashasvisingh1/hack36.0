const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));
const isAuth = require("./isauth");
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
      keywords:[req.body.category]
    })
    await userData.save();
    // const data=await UserData.findOne({email:email});
    // await data.keywords.push(req.body.category);
    console.log(userData);
    res.redirect("/secrets");
  }else{
    console.log("error")
  }
});
module.exports=router;