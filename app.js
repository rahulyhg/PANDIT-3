//Load all npm package
var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

//Load Database model
var User = require('./models/user');

//Define Routes
var indexRoute = require("./routes/index");
var userRoute = require("./routes/user");
var chatRoute = require("./routes/chat");
var courseRoute = require('./routes/course');


//Connect DB mongoose.connect(process.env.DATABASE);
mongoose.connect('mongodb://localhost/pandit');

// Get passport config
require('./configs/passport')(passport);

//Set and use all modules
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//Set authentication middleware (passport)
app.use(require("express-session")({
    secret:"PANDIT is good dude",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req,res,next){
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
});


//Set use routes
app.use(indexRoute);
app.use(userRoute);
app.use(chatRoute);
app.use(courseRoute);

//Listen Port,IP
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!");
})

