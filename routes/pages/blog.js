const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const blogdata=require("../../src/models/blogdata");
const isAuth = require("../auth/isauth");


router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.get("/blog",async function(req,res){
    
    try{
      const user=await isAuth(req);
      console.log(user);
      const result=await blogdata.find();
      // console.log(result);
      if(user)
      res.status(200).render("blog/blog.ejs",{blogs:result});
      else console.log("no cookie");
    }
    catch(err){
      res.status(401).send(err);
    }
});

module.exports=router;