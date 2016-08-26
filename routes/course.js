var express=require("express"),
    router = express.Router(),
    Course = require('../models/course'),
    User = require('../models/user'),
    middleware = require('../middlewares');

//define course creation route

router.get('/course/create',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    res.render('course/create',{header:"Create your own course"});
})

router.get('/course/:course_id/edit',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    res.render("course/edit",{header: "Edit your own course"});
})

router.post('/course',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    var userId = req.user._id
    var courseData={
        'tutor.name'  :   req.user.local.email || req.user.facebook.name,
        'tutor.id'    :   userId,
        subject :   req.body.subject,
        name    :   req.body.name,
        desc    :   req.body.desc,
        date    :   req.body.date,
        price   :   req.body.price,
        level   :   req.body.class,
        location:   req.body.location,
        video   :   req.body.youtube,
    };
    
    Course.create(courseData,(err,course)=>{
        if(err) throw err;
        User.findById(userId,(err,user)=>{
            if (err) throw err;
            user.course.push(course);
            user.save((err,data)=>{
                if (err) throw err;
                res.redirect('/course/'+course.id);
            })
        })
    })
})

//define course route
router.get("/course",function(req,res){
    res.render("course/browse",{header: "Choose subject and location here"})
})

router.get('/course/:course_id',function(req,res){
    res.render("course/show",{header: "Sub"});
})

module.exports=router;