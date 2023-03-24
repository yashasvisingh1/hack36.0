// const express = require("express");
// const session = require("express-session");
// const findOrCreate = require("mongoose-findorcreate");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const createToken = require("./createtoken");

// const router = express.Router();


// router.use(
//   session({
//     secret: "Ourvvtybtguybyggygg.",
//     resave: false,
//     saveUninitialized: true,
//     //cookie: { secure: true }
//   })
// );

// router.use(passport.initialize());
// router.use(passport.session());

// const User=require("../../src/models/userauth");

// // userSchema.plugin(passportLocalMongoose);
// // userSchema.plugin(findOrCreate);


// // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
// //passport.use(User.createStrategy());

// // used to serialize the user for the session
// // passport.serializeUser(function (user, done) {
// //   done(null, user.id);
// //   // where is this user.id going? Are we supposed to access this anywhere?
// // });

// // // used to deserialize the user
// // passport.deserializeUser(function (id, done) {
// //   User.findById(id, function (err, user) {
// //     done(err, user);
// //   });
// // });


// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/google/secrets",
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//       },
//       function (accessToken, refreshToken, profile, cb) {
//         user_id = profile.id;
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//       }
//     )
//   );

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );
// router.get(
//   "/auth/google/secrets",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/secrets");
//   }
// );

// module.exports = router;

