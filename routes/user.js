var express=require("express"),
    router = express.Router(),
    passport=require("passport"),
    multer = require('multer'),
    upload = multer({dest:'./public/uploads'}),
    User = require("../models/user"),
    middleware = require('../middlewares');
    

//define register routes
router.get("/register",function(req,res){
    var tutor = req.query.tutor || false;
    res.render("user/register",{header: "Register here!",tutor:tutor})
})

//define profile routes
router.get('/profile',middleware.isLoggedIn,function(req,res){
    res.render("user/profile",{header: "Your Profiles",data:req.user})
})

//define put profile
var files = upload.fields([{ name: 'profilepic', maxCount: 1 }, { name: 'idcard', maxCount: 1 }])
router.put('/profile',middleware.isLoggedIn,files,function(req,res){
    var userId = req.user.id;
    var userProfile = {
        'email':req.body.email,
        'type':req.body.type,
        'tel':req.body.tel,
        'fullname':req.body.fullname,
        'age':req.body.age,
        'gender':req.body.gender,
        'graduate':req.body.graduate,
        'introduce':req.body.introduce
    }
    
    if(req.body.password!=''){
        userProfile.password=req.body.password;
    }
    
    User.findByIdAndUpdate(userId,userProfile,function(err,newUser){
            if(err){
                console.log(err);
                req.flash('error','Error occurs')
                res.redirect('/profile');
            }else{
                req.flash('success','Successfully updated your profile');
                res.redirect('/profile');
            }
    
    res.redirect('/main');
})



//define post signup 

//local signup
router.post('/registerlocal', passport.authenticate('local-signup', { failureRedirect: '/register', failureFlash: true })
    ,function(req, res) {
        var userId = req.user.id;
        var userProfile = {
            'email':req.body.email,
            'type':req.body.type,
            'tel':req.body.tel,
            'fullname':req.body.fullname,
            'age':req.body.age,
            'gender':req.body.gender,
            'graduate':req.body.graduate,
            'introduce':req.body.introduce
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
            successFlash:true,
            failureFlash:true
        }));
        
//define post login

//local sign in
router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/user',
        failureRedirect : '/main',
        failureFlash : true
    }));
    
//logout
router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You have been logged out.')
    res.redirect('/main');
})
    

module.exports=router;