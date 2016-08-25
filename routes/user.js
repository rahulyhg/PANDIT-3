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

//define post signup 

//local
router.post('/registerlocal', passport.authenticate('local-signup', { failureRedirect: '/register', failureFlash: true }),
  function(req, res) {
    var userId = req.user.id;
    var userProfile = {
        'profile[email]':req.body.email,
        'profile.type':req.body.type,
        'profile.tel':req.body.tel,
        'profile.fullname':req.body.fullname,
        'profile.age':req.body.age,
        'profile.gender':req.body.gender,
        'profile.graduate':req.body.graduate,
        'profile.introduce':req.body.introduce
    }
    console.log(userId);
    console.log(userProfile);
    User.findByIdAndUpdate(userId,userProfile,function(err,newUser){
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            req.flash('success','Welcome to PANDIT! K. '+req.body.fullname);
            res.redirect('/main');
        }
    })
  });


module.exports=router;