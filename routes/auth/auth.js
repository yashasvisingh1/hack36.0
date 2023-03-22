const express = require("express");

const router = express.Router();

const login = require("./login");
//const verify = require("./verify");
const google = require("./google");


// router.use("/google",login);
router.use("/",login);
//router.use("/verifyemail",verify);
router.use("/google",google);


module.exports = router;
