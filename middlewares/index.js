var middlewareObject={};

middlewareObject.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!");
    res.redirect("/main");
}

middlewareObject.isTutor=function(req,res,next){
    if(req.user.type=='tutor'){
        return next();
    }
    req.flash("error","Tutor Only Section");
    res.redirect("/main");
}

module.exports=middlewareObject;