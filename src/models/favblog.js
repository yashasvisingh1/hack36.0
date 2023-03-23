require("../db/connection");
const mongoose = require("mongoose");

const favBlogSchema={
    id:String,
    favourites:[],
}

const favBlogData = new mongoose.model("favBlogData", favBlogSchema);
module.exports = favBlogData;