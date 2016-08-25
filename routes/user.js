var express=require("express"),
    router = express.Router(),
    passport=require("passport"),
    User = require("../models/user"),
    middleware = require('../middlewares');
    

//define register routes
router.get("/register",function(req,res){
    res.render("user/register",{header: "Register here!"})
})

router.get('/profile',middleware.isLoggedIn,function(req,res){
    res.render("user/profile",{header: "Your Profiles"})
})

//define post signup 

//local signup
router.post('/registerlocal', passport.authenticate('local-signup', { failureRedirect: '/register', failureFlash: true })
    ,function(req, res) {
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
        User.findByIdAndUpdate(userId,userProfile,function(err,newUser){
            if(err){
                console.log(err);
                res.redirect('/register');
            }else{
                req.flash('success','Welcome to PANDIT! K. '+req.body.fullname);
                res.redirect('/course');
            }
    })
  });
  
//facebook signup and login
router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/register',
            successFlash: true,
            failureFlash:true
        }));
        
//define post login

//local sign in
router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/course',
        failureRedirect : '/main',
        failureFlash : true
    }));
    


module.exports=router;