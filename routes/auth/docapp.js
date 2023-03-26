const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const Doc=require("../../src/models/docdata");
const isAuth = require("../auth/isauth");

router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));
router.get("/docapp",async function(req,res){
    const user=isAuth(req);
    if(user){
        let docs=await Doc.find();
        res.render("docapp",{docs:docs});
    }else{
        res.send("not authenticated");
    }
})

module.exports=router