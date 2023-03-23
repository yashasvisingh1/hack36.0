const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const isAuth = require("../auth/isauth");


router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.get("/focus",async function(req,res){
    const user=await isAuth(req);
    if(user){
        try{
            res.status(200).render("Emotion.ejs");
        }catch(e){
            console.log(e);
        }
    }else{
        console.log("user not registered");
    }
})
module.exports=router;