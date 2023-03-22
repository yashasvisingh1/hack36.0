const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));




router.post("/form",async function(req,res){
    console.log(req.body);
});
module.exports=router;