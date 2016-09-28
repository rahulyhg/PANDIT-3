//Load all npm package
var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    cookieParser = require('cookie-parser'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    io = require('socket.io')();


//Define Routes
var indexRoute = require("./routes/index");
var userRoute = require("./routes/user");
var chatRoute = require("./routes/chat");
var courseRoute = require('./routes/course');


mongoose.connect(process.env.DATABASE);

// Get passport config
require('./configs/passport')(passport);

//Set and use all modules
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
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

//Define global element
app.use(function(req,res,next){
    //current user
    res.locals.currentUser = req.user;
    
    //flash
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
});


//Set use routes
app.use(indexRoute);
app.use(userRoute);
app.use(chatRoute);
app.use(courseRoute);
app.use(showError);

function showError(req,res){
    res.status(404).send("Error 404 Not Found");
}

// IO Chat 
var Chat = require('./models/chat');
io.on('connection',function(socket){
    socket.on('message',function(m){
				socket.broadcast.send(m);
				
				Chat.findById(m.roomId,function(err,chat){
				    if (err) throw err;
				    var chatMessage={
				        sender:m.sender,
				        message:m.message,
				        // read:false
				    }
				    
				    chat.chatLog.push(chatMessage);
				    // chat.read=[m.user];
				    chat.save(function(err,data){
				        if(err) throw err;
				    })
				})
			})
	
// 	socket.on('read',function(m){
// 	    console.log('read');
// 	    Chat.findById(m.roomId,function(err,chat){
// 	        if(err) throw err;
// 	        chat.read.push(m.user2);
// 	        chat.save(function(err,data){
// 	            if(err) throw err;
// 	        })
// 	    })
// 	})
})

//Listen Port,IP
io.listen(app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!");
}));

