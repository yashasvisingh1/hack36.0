const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const blogData = require("../../src/models/blogdata");
router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.get("/blog/createblog",async function(req,res){
    
    try{
      res.status(200).render("blog/createblog.ejs");
    }
    catch(err){
      res.status(401).send(err);
    }
});


router.post("/post",async function(req,res){
    const title=req.body.textarea;
    const category=req.body.category;
    const body=req.body.body;
    const check=req.body.check;
    var name="";
    var rand=Math.ceil(Math.random()*18);
    const image="/images/"+rand+".jpeg"
    const rating=0;
    if(check=="on") name="Anonymous";
    else name="Sarthak";
    const newblog=new blogData({
        name:name,
        title:title,
        body:body,
        keyword:category,
        rating:rating,
        img:image,
    })
    newblog.save();
    res.redirect("/blog/createblog");
});

module.exports=router;