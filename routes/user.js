var express=require("express"),
    router = express.Router(),
    passport=require("passport"),
    User = require("../models/user");


//define register routes
router.get("/register",function(req,res){
    res.render("user/register",{header: "Register here!"})
})

router.get('/profile',function(req,res){
    res.render("user/profile",{header: "Your Profiles"})
})

router.post('/register',function(req,res){
    // no file upload,chat ,couse ,check type
    console.log(req.body);
    var newUser=new User({username:req.body.email,
        email:req.body.email,
        type:req.body.type,
        tel:req.body.tel,
        fullname:req.body.fullname,
        age:req.body.age,
        gender:req.body.gender,
        graduate:req.body.graduate,
        introduce:req.body.introduce
    })
    
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            // req.flash("error",err.message);
            return res.redirect("/register")
        }
            passport.authenticate('local')(req,res,function(){
                // req.flash("success","Welcome to PANDIT "+user.fullname);
                res.redirect("/main");
            })
    })
        
})


module.exports=router;