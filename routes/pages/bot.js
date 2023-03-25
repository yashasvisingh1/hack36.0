require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const router =  new express.Router();
const blogdata=require("../../src/models/blogdata");
const favBlogData=require("../../src/models/favblog");
const isAuth = require("../auth/isauth");
const axios=require("axios");

router.use(express.static("public"));
router.use(bodyparser.urlencoded({
    extended: true
}));

const { Configuration, OpenAIApi } =require("openai");

const configuration = new Configuration({
    organization: "org-MLTUzrHw0zfoyrh6pAkRtDAo",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

router.get("/bot",async function(req,res){
    res.render("bot.ejs");
})


module.exports=router;

