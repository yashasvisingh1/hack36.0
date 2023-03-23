
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const Web = require( "webwebweb" );
const fs = require( "fs" );
var room;
// const mongoose=require("mongoose");


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(cookieSession({
    maxAge :24*60*60*1000,
    keys : ['codeforces_grandmasters_team']
}));

//initialize
app.use(passport.initialize());
app.use(passport.session());
const User=require("./src/models/userauth");
// const userdetails = require("./routes/user/user");
// const viewprofile = require("./routes/viewprofiles");
// const Auth = require("./routes/auth/auth");
// const api = require("./src/api/api");
// const sos = require("./routes/sos/sos");
// const UserDetail = require("./src/models/userDetails");
  const isAuth = require("./routes/auth/isauth");
// const Chat = require("./src/models/chat");

// app.use("/auth", Auth);
// app.use("/api", api);
// app.use("/buildprofile", userdetails);
// app.use("/",viewprofile);
const createToken=require("./routes/auth/createtoken");

const blog = require("./routes/pages/blog");
const createblog=require("./routes/pages/createblog");
const userData=require("./src/models/userdata");
const form=require("./routes/auth/form");
const focus=require("./routes/pages/focus");


//use statements
app.use(blog);
app.use(createblog);
app.use(form);
app.use(focus);


app.get("/",async (req,res)=>{
  console.log("get");
    try{
        res.status(200).render("home");
    
  } catch (err) {
    res.status(401).send(err);
  }
});
app.get("/login",async function(req,res){
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(401).send(error);
  }
});
app.get("/register",async function(req,res){
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(401).send(error);
  }
});
app.get("/form",async function(req,res){
  const user=await isAuth(req);
  if(user){
    console.log(user);
    res.render("form");
  }else{
    res.send("not authenticated");
  }
});
app.get("/secrets",async function(req,res){
  //console.log(req);
  const user=await isAuth(req);
  if(user){
    console.log(user);
    res.render("secrets");
  }else{
    res.send("not authenticated");
  }
});
app.post("/register",async function(req,res){
    let password=req.body.password;
    let cpassword=req.body.confirmpassword;
    const name=req.body.name;
    const email=req.body.email;
    if(password===cpassword){
      // let hashpassword;
      const newpassword = async function(password){
        password=await bcrypt.hash(password,10);
        console.log(password);
        return password;
      }
      password=await newpassword(password);
      console.log(password);
      let user=new User({
        username:name,
        email:email,
        password:password
      })
      //user=isAuth(req);
      user.save();
      const token=await createToken(user._id);
      res.cookie("jwt", token.toString(), {
        expires: new Date(Date.now() + 6000000),
        httpOnly: true
      });
      res.redirect("/form");
    }else{
      console.log("error in register")
      res.redirect("/register")
    }
})
app.post("/login",async function(req,res){
  const email=req.body.email;
  let password=req.body.password;

  let user =await User.findOne({email:email});
  let flag=await bcrypt.compare(password,user.password);
  //console.log("flag "+flag);
  if(user&&flag){
    const token=await createToken(user._id);
    res.cookie("jwt", token.toString(), {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true
    });
    const a=await req.cookies.jwt;
    console.log(a);
    res.redirect("/secrets");
  }else{
    res.redirect("/login");
    console.log("error");
  }
})

app.get("/call/room.html",(req,res)=>{
  console.log("video call called");
  res.sendFile(__dirname+"/room.html");
});

app.get("/call/:roomid",async function(req,res){
  room = req.params.roomId;
  res.sendFile(__dirname+"/lobby.html");
});



app.get("*",async (req,res)=>{
  res.status(404).render("error/error.ejs");
});



Web.APIs[ "/data" ] = ( qs, body, opts ) => {
    let data = {};
    [ "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise" ]
        .forEach( emotion => {
            data[ emotion ] = fs.readdirSync( `views/web/fer2013/train/${emotion}` )
                .map( x => `views/web/fer2013/train/${emotion}/${x}` );
        });
    return data;
};
Web.Run( 8080 );

const PORT = 3000;
http.listen(PORT, (req, res) => {
  console.log(`server started on port:${PORT}`);
});