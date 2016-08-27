var express=require("express"),
    router = express.Router(),
    passport=require("passport"),
    multer = require('multer'),
    upload = multer({dest:'./public/uploads'}),
    fs = require('fs'),
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
    
    //Profile
    var userId = req.user.id;
    var userProfile = {
        'local.email':req.body.email,
        'type':req.body.type,
        'tel':req.body.tel,
        'fullname':req.body.fullname,
        'age':req.body.age,
        'gender':req.body.gender,
        'graduate':req.body.graduate,
        'introduce':req.body.introduce
    }
    
    if(req.body.password!=''){
        var passwordHash = new User()
        userProfile['local.password']=passwordHash.generateHash(req.body.password);
    }
    
    //File Upload
    
        //checking file type for profilepic
        var profilepic={};
        var profileNew='';
        if (req.files['profilepic']){
            profilepic=req.files['profilepic'][0];
            
            if (profilepic.mimetype=="image/png"){
                profileNew=profilepic.filename+'.png';
                
            }else if (profilepic.mimetype=='image/jpeg'){
			    profileNew =profilepic.filename+'.jpg';
			    
		    }else{
		        fs.unlink('./public/uploads/'+profilepic.filename,err=>{
		            if(err) throw err;
		            req.flash('error','Error Profile Picture File Type.')
			        res.redirect('/profile');
			        return;
		        })
		        return;
			    
		    }
		    fs.rename("./public/uploads/"+profilepic.filename,"./public/uploads/profilepic_"+profileNew);
		    userProfile.profilepic='profilepic_'+profileNew;
        }
        
        //checking file type for id card
        var idcardpic={};
        var idcardNew='';
        if (req.files['idcard']){
            idcardpic=req.files['idcard'][0];
            
            if (idcardpic.mimetype=="image/png"){
                idcardNew=idcardpic.filename+'.png';
                
            }else if (idcardpic.mimetype=='image/jpeg'){
			    idcardNew =idcardpic.filename+'.jpg';
			    
		    }else{
		        fs.unlink('./public/uploads/'+idcardpic.filename,err=>{
		            if(err) throw err;
		            req.flash('error','Error Identity Card Picture File Type.')
			        res.redirect('/idcard');
			        return;
		        })
		        return;
			    
		    }
		    fs.rename("./public/uploads/"+idcardpic.filename,"./public/uploads/idcardpic_"+idcardNew);
		    userProfile.idcard='idcardpic_'+idcardNew;
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
    

    })
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
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));
    
//logout
router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You have been logged out.')
    res.redirect('/');
})
    

module.exports=router;