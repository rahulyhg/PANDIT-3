var middlewareObject={};
var Course = require('../models/course');

middlewareObject.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please proceed to login page!");
    res.redirect("/");
}

middlewareObject.isTutor=function(req,res,next){
    if(req.user.type=='tutor'){
        return next();
    }
    req.flash("error","Tutor Only Section");
    res.redirect("/");
}

middlewareObject.isStudent=function(req,res,next){
    if(req.user.type=='student'){
        return next();
    }
    req.flash("error","Student Only Section");
    res.redirect("/");
}

middlewareObject.checkCourseOwnership=function(req,res,next){
    Course.findById(req.params.course_id,function(err,foundCourse){
        if (err) throw err;
        if (foundCourse.tutor.id.equals(req.user._id)){
            next();
        }else{
            req.flash('error',"You don't have permission to delete other people course");
            res.redirect('back');
        }
    })
}

module.exports=middlewareObject;