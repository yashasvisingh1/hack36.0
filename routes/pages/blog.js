const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const blogdata=require("../../src/models/blogdata");
const favBlogData=require("../../src/models/favblog");
const isAuth = require("../auth/isauth");


router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.get("/blog",async function(req,res){
    
    try{
      const user=await isAuth(req);
      const email=user.email;
      const uid=user._id;
      var check=false;
      // console.log(user);
      const result=await blogdata.find();
      const user_specific_data=await blogdata.find({email:email});
      // console.log(result);
      if(user)
      res.status(200).render("blog/blog.ejs",{blogs:result,your_data:user_specific_data,uid:uid});
      // console.log("emotion");
      // res.render("Emotion.ejs");
      else console.log("no cookie");
    }
    catch(err){
      res.status(401).send(err);
    }
});

router.get("/blog/chosen/:category",async function(req,res){
  try{
    const user=await isAuth(req);
    const email=user.email;
    console.log("hello"+req.params.category);
    const result=await blogdata.find({keywords:req.params.category});
    const result1=await blogdata.find({keywords:req.params.category,email:email})
    console.log(result);
    res.status(200).render("blog/blog.ejs",{blogs:result,your_data:result1});
  }catch(e){
    console.log(e);
  }
})

router.post("/blog/increaselike",async function(req,res){
  const {parcel,id}=req.body;
  const user=await isAuth(req);
  const uid=user._id;
  try{
    const result=await blogdata.updateOne({_id:id},{
      $set:{
        rating:parcel
      },
      $push:{
        likedUsers:uid
      }
    });
  }catch(e){
    console.log("couldn't update blogs rating");
  }
  
});

router.post("/blog/addtofavourites",async function(req,res){
  console.log("addtofavourites");
  const {id}=req.body;
  const user=await isAuth(req);
  const uid=user._id;
  try{
    const result=await favBlogData.updateOne({id:uid},{
      $push:{
        favourites:id
      }
    });
  }catch(e){
    console.log(e);
  }
})

module.exports=router;