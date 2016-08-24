//Load all npm package
var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
//Define Routes
var indexRoute = require("./routes/index");
var userRoute = require("./routes/user");
var chatRoute = require("./routes/chat");
var courseRoute = require('./routes/course');

//Set and use all modules
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Set use routes
app.use(indexRoute);
app.use(userRoute);
app.use(chatRoute);
app.use(courseRoute);

//Listen Port,IP
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!");
})

